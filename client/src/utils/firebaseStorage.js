// client/src/utils/firebaseStorage.js
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase.js';

/**
 * Upload image to Firebase Storage
 * @param {File} file - The image file to upload
 * @param {string} folder - Optional folder path (default: 'blog-images')
 * @returns {Promise<string>} - The download URL of the uploaded image
 */
export const uploadImageToFirebase = async (file, folder = 'blog-images') => {
  try {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only images are allowed.');
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error('File size exceeds 10MB limit.');
    }

    // Create a unique filename
    const timestamp = Date.now();
    const randomString = Math.round(Math.random() * 1E9);
    const fileExtension = file.name.split('.').pop();
    const fileName = `content-${timestamp}-${randomString}.${fileExtension}`;
    
    // Create a reference to the file location in Firebase Storage
    const storageRef = ref(storage, `${folder}/${fileName}`);

    // Upload the file
    console.log('[Firebase Storage] Uploading image...', fileName);
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('[Firebase Storage] ✅ Image uploaded successfully:', downloadURL);
    
    return downloadURL;
  } catch (error) {
    console.error('[Firebase Storage] ❌ Error uploading image:', error);
    throw error;
  }
};

/**
 * Upload image for blog posts
 */
export const uploadBlogImage = async (file) => {
  return uploadImageToFirebase(file, 'blog-images');
};

/**
 * Upload image for general content
 */
export const uploadContentImage = async (file) => {
  return uploadImageToFirebase(file, 'content-images');
};

