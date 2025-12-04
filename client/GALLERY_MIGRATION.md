# Gallery Data Migration Guide

This guide explains how to migrate existing gallery images and data from the static file to Firebase Storage and Firestore.

## Overview

The migration process will:
1. Read all gallery items from `client/src/data/galleryData.js`
2. Download each image from the `public/Gallery/` folder
3. Upload each image to Firebase Storage (`gallery-images/` folder)
4. Save the gallery item data to Firestore with the new Firebase Storage URL
5. Preserve the original numeric IDs from the static data

## How to Run Migration

### Option 1: Using Admin Panel (Recommended)

1. Log in to the Admin Dashboard
2. Navigate to the **Gallery** tab
3. Click the **🔄 Migrate Existing Data** button
4. Confirm the migration when prompted
5. Wait for the migration to complete (progress bar will show status)
6. Review the results in the alert dialog

### Option 2: Programmatic Migration

You can also run the migration programmatically:

```javascript
import { migrateGalleryData, checkMigrationStatus } from './utils/migrateGallery.js';

// Check current migration status
const status = await checkMigrationStatus();
console.log('Migration Status:', status);

// Run migration
const results = await migrateGalleryData({
  skipExisting: true, // Skip items that already exist
  onProgress: (current, total, item) => {
    console.log(`Processing ${current}/${total}: ${item.eventName}`);
  }
});

console.log('Migration Results:', results);
```

## Migration Features

- **Skip Existing**: Items with the same numeric ID are automatically skipped
- **Progress Tracking**: Real-time progress updates during migration
- **Error Handling**: Failed items are logged but don't stop the migration
- **ID Preservation**: Original numeric IDs are preserved in Firestore
- **Image Upload**: All images are uploaded to Firebase Storage with unique filenames

## Migration Results

After migration, you'll see:
- **Total**: Total number of items in the static data
- **Successful**: Number of items successfully migrated
- **Failed**: Number of items that failed to migrate
- **Skipped**: Number of items that were already in Firestore

## Post-Migration

After successful migration:
1. All gallery images will be in Firebase Storage
2. All gallery data will be in Firestore
3. The Gallery page will automatically fetch from Firestore
4. You can manage all gallery items through the Admin Panel

## Troubleshooting

### Images Not Found
If an image file is missing from `public/Gallery/`, the migration will fail for that item. Check the console for specific error messages.

### Firebase Storage Quota
If you hit storage quota limits, you may need to upgrade your Firebase plan or delete old images.

### Network Issues
If migration fails due to network issues, you can run it again. The `skipExisting` option will prevent duplicate uploads.

## Notes

- Migration preserves the original numeric `id` field from the static data
- Images are uploaded with unique filenames to prevent conflicts
- The migration process includes delays between items to avoid rate limiting
- Failed items can be manually added through the Admin Panel

