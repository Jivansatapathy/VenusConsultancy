// client/src/utils/galleryFirestore.js
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase.js';

const GALLERY_COLLECTION = 'gallery';

/**
 * Get all gallery items from Firestore
 * @returns {Promise<Array>} Array of gallery items
 */
export const getGalleryItems = async () => {
  try {
    // Check if db is initialized
    if (!db) {
      throw new Error('Firestore database is not initialized');
    }

    const galleryRef = collection(db, GALLERY_COLLECTION);
    
    // Try to order by 'id', but if it fails (e.g., no items or missing index), fetch without ordering
    let querySnapshot;
    try {
      const q = query(galleryRef, orderBy('id', 'desc'));
      querySnapshot = await getDocs(q);
    } catch (orderError) {
      // If ordering fails (e.g., missing index or no items), fetch without ordering
      console.warn('Could not order by id, fetching without order:', orderError);
      querySnapshot = await getDocs(galleryRef);
    }
    
    const items = [];
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      items.push({
        docId: docSnapshot.id, // Firestore document ID
        ...data // Includes the numeric 'id' field from the data
      });
    });
    
    // Sort manually if we couldn't use orderBy
    items.sort((a, b) => (b.id || 0) - (a.id || 0));
    
    return items;
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    
    // Provide more helpful error messages
    if (error.code === 'permission-denied') {
      throw new Error('Permission denied. Please check Firestore security rules.');
    } else if (error.code === 'unavailable') {
      throw new Error('Firestore is temporarily unavailable. Please try again later.');
    } else if (error.message?.includes('index')) {
      throw new Error('Firestore index required. Please create an index for the "gallery" collection on field "id".');
    }
    
    throw error;
  }
};

/**
 * Add a new gallery item to Firestore
 * @param {Object} itemData - Gallery item data
 * @param {number} forceId - Optional: Force a specific numeric ID (for migration)
 * @returns {Promise<string>} Document ID
 */
export const addGalleryItem = async (itemData, forceId = null) => {
  try {
    // Check if db is initialized
    if (!db) {
      throw new Error('Firestore database is not initialized');
    }

    let itemId = forceId;
    
    // If no forceId provided, get the next ID by finding the highest current ID
    if (itemId === null) {
      try {
        const existingItems = await getGalleryItems();
        const maxId = existingItems.length > 0 
          ? Math.max(...existingItems.map(item => item.id || 0))
          : 0;
        itemId = maxId + 1;
      } catch (fetchError) {
        // If fetching fails, start from 1
        console.warn('Could not fetch existing items, starting ID from 1:', fetchError);
        itemId = 1;
      }
    }
    
    const galleryRef = collection(db, GALLERY_COLLECTION);
    const newItem = {
      ...itemData,
      id: itemId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(galleryRef, newItem);
    return docRef.id;
  } catch (error) {
    console.error('Error adding gallery item:', error);
    
    // Provide more helpful error messages
    if (error.code === 'permission-denied') {
      throw new Error('Permission denied. Please check Firestore security rules.');
    } else if (error.code === 'unavailable') {
      throw new Error('Firestore is temporarily unavailable. Please try again later.');
    }
    
    throw error;
  }
};

/**
 * Update an existing gallery item in Firestore
 * @param {string} docId - Firestore document ID (docId field)
 * @param {Object} itemData - Updated gallery item data
 */
export const updateGalleryItem = async (docId, itemData) => {
  try {
    const itemRef = doc(db, GALLERY_COLLECTION, docId);
    await updateDoc(itemRef, {
      ...itemData,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating gallery item:', error);
    throw error;
  }
};

/**
 * Delete a gallery item from Firestore
 * @param {string} docId - Firestore document ID
 * @param {string} imageUrl - Optional image URL to delete from Storage
 */
export const deleteGalleryItem = async (docId, imageUrl = null) => {
  try {
    // Delete from Firestore
    const itemRef = doc(db, GALLERY_COLLECTION, docId);
    await deleteDoc(itemRef);
    
    // If image URL is provided and it's a Firebase Storage URL, delete the image
    if (imageUrl && imageUrl.includes('firebasestorage.googleapis.com')) {
      try {
        // Extract the path from the Firebase Storage URL
        const urlParts = imageUrl.split('/');
        const pathIndex = urlParts.findIndex(part => part === 'o');
        if (pathIndex !== -1 && pathIndex < urlParts.length - 1) {
          const encodedPath = urlParts[pathIndex + 1].split('?')[0];
          const decodedPath = decodeURIComponent(encodedPath);
          const imageRef = ref(storage, decodedPath);
          await deleteObject(imageRef);
          console.log('Image deleted from Storage:', decodedPath);
        }
      } catch (storageError) {
        console.warn('Error deleting image from Storage (non-critical):', storageError);
        // Don't throw - Firestore deletion succeeded
      }
    }
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    throw error;
  }
};

