// client/src/utils/migrateGallery.js
// Migration script to upload existing gallery images to Firebase Storage and seed Firestore
// Run this once to migrate existing gallery data

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase.js';
import { addGalleryItem, getGalleryItems } from './galleryFirestore.js';
import { galleryData } from '../data/galleryData.js';

/**
 * Convert a public image path to a File object by fetching it
 * @param {string} imagePath - Path to the image (e.g., "/Gallery/image.jpg")
 * @returns {Promise<File>} File object
 */
const fetchImageAsFile = async (imagePath) => {
  try {
    // Fetch the image from the public folder
    const response = await fetch(imagePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${imagePath} - ${response.statusText}`);
    }
    
    const blob = await response.blob();
    
    // Extract filename from path
    const filename = imagePath.split('/').pop();
    
    // Create a File object from the blob
    const file = new File([blob], filename, { type: blob.type });
    return file;
  } catch (error) {
    console.error(`Error fetching image ${imagePath}:`, error);
    throw error;
  }
};

/**
 * Upload image to Firebase Storage
 * @param {File} file - Image file to upload
 * @param {string} folder - Folder path in Storage (default: 'gallery-images')
 * @returns {Promise<string>} Download URL
 */
const uploadImageToStorage = async (file, folder = 'gallery-images') => {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const randomString = Math.round(Math.random() * 1E9);
    const fileExtension = file.name.split('.').pop();
    const fileName = `gallery-${timestamp}-${randomString}.${fileExtension}`;
    
    // Create a reference to the file location in Firebase Storage
    const storageRef = ref(storage, `${folder}/${fileName}`);
    
    // Upload the file
    console.log(`[Migration] Uploading image: ${file.name}...`);
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log(`[Migration] ✅ Image uploaded successfully: ${downloadURL}`);
    
    return downloadURL;
  } catch (error) {
    console.error(`[Migration] ❌ Error uploading image ${file.name}:`, error);
    throw error;
  }
};

/**
 * Migrate a single gallery item
 * @param {Object} item - Gallery item from static data
 * @param {number} index - Index in the array
 * @returns {Promise<Object>} Result object
 */
const migrateGalleryItem = async (item, index) => {
  try {
    console.log(`[Migration] Processing item ${index + 1}/${galleryData.length}: ${item.eventName}`);
    
    // Fetch and upload the image
    let imageUrl = item.image;
    
    // If image is a local path (starts with /), upload it to Firebase Storage
    if (imageUrl.startsWith('/')) {
      const imageFile = await fetchImageAsFile(imageUrl);
      imageUrl = await uploadImageToStorage(imageFile);
    }
    
    // Prepare the item data for Firestore
    const itemData = {
      eventName: item.eventName,
      location: item.location || '',
      description: item.description || '',
      attendees: item.attendees || '',
      orientation: item.orientation || 'landscape',
      image: imageUrl,
      id: item.id // Preserve the original ID
    };
    
    // Add to Firestore, preserving the original numeric ID
    const docId = await addGalleryItem(itemData, item.id);
    console.log(`[Migration] ✅ Item added to Firestore with docId: ${docId}, numeric ID: ${item.id}`);
    
    return {
      success: true,
      item: item.eventName,
      docId,
      imageUrl
    };
  } catch (error) {
    console.error(`[Migration] ❌ Error migrating item "${item.eventName}":`, error);
    return {
      success: false,
      item: item.eventName,
      error: error.message
    };
  }
};

/**
 * Main migration function
 * @param {Object} options - Migration options
 * @param {boolean} options.skipExisting - Skip items that already exist in Firestore
 * @param {Function} options.onProgress - Progress callback (index, total, item)
 * @returns {Promise<Object>} Migration results
 */
export const migrateGalleryData = async (options = {}) => {
  const { skipExisting = true, onProgress } = options;
  
  console.log('[Migration] Starting gallery data migration...');
  console.log(`[Migration] Total items to migrate: ${galleryData.length}`);
  
  // Check existing items if skipExisting is true
  let existingIds = new Set();
  if (skipExisting) {
    try {
      const existingItems = await getGalleryItems();
      existingItems.forEach(item => {
        if (item.id) {
          existingIds.add(item.id);
        }
      });
      console.log(`[Migration] Found ${existingIds.size} existing items in Firestore`);
    } catch (error) {
      console.warn('[Migration] Could not fetch existing items, will proceed anyway:', error);
    }
  }
  
  const results = {
    total: galleryData.length,
    successful: 0,
    failed: 0,
    skipped: 0,
    details: []
  };
  
  // Process items one by one to avoid overwhelming Firebase
  for (let i = 0; i < galleryData.length; i++) {
    const item = galleryData[i];
    
    // Skip if already exists
    if (skipExisting && existingIds.has(item.id)) {
      console.log(`[Migration] ⏭️  Skipping item ${i + 1} (ID ${item.id}) - already exists`);
      results.skipped++;
      results.details.push({
        success: true,
        item: item.eventName,
        skipped: true
      });
      
      if (onProgress) {
        onProgress(i + 1, galleryData.length, item);
      }
      continue;
    }
    
    // Call progress callback
    if (onProgress) {
      onProgress(i + 1, galleryData.length, item);
    }
    
    // Migrate the item
    const result = await migrateGalleryItem(item, i);
    
    if (result.success) {
      results.successful++;
    } else {
      results.failed++;
    }
    
    results.details.push(result);
    
    // Add a small delay to avoid rate limiting
    if (i < galleryData.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  console.log('[Migration] ========================================');
  console.log('[Migration] Migration completed!');
  console.log(`[Migration] Total: ${results.total}`);
  console.log(`[Migration] Successful: ${results.successful}`);
  console.log(`[Migration] Failed: ${results.failed}`);
  console.log(`[Migration] Skipped: ${results.skipped}`);
  console.log('[Migration] ========================================');
  
  return results;
};

/**
 * Check migration status
 * @returns {Promise<Object>} Status information
 */
export const checkMigrationStatus = async () => {
  try {
    const existingItems = await getGalleryItems();
    const staticItems = galleryData;
    
    const existingIds = new Set(existingItems.map(item => item.id).filter(Boolean));
    const staticIds = new Set(staticItems.map(item => item.id));
    
    const migrated = existingIds.size;
    const total = staticIds.size;
    const missing = [...staticIds].filter(id => !existingIds.has(id));
    
    return {
      total,
      migrated,
      missing: missing.length,
      missingIds: missing,
      percentage: total > 0 ? Math.round((migrated / total) * 100) : 0
    };
  } catch (error) {
    console.error('Error checking migration status:', error);
    throw error;
  }
};

