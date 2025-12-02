# Gallery Image Loading Debug Guide

## Quick Fixes Applied

1. ✅ **Improved Image URL Handling**
   - Now properly handles Firebase Storage URLs (https://)
   - Handles local paths (/Gallery/image.jpg)
   - Better error logging

2. ✅ **Better Error Handling**
   - Console logs show which images fail to load
   - Fallback to static data if Firestore fails
   - Empty state message if no items

3. ✅ **Enhanced Debugging**
   - Console logs show how many items were fetched
   - Error details logged for troubleshooting

## How to Debug Image Loading Issues

### Step 1: Check Browser Console

Open browser console (F12) and look for:

```
Fetched gallery items from Firestore: X
```

**If you see:**
- `Fetched gallery items from Firestore: 0` → No data in Firestore, using static data
- `Error fetching gallery data from Firestore:` → Firestore connection issue
- `Image failed to load: [URL]` → Specific image URL is broken

### Step 2: Check Firestore Data

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Navigate to **Firestore Database** → `gallery` collection
3. Check if documents exist
4. Verify each document has:
   - `image` field with a valid URL
   - `eventName` field
   - `id` field (numeric)

### Step 3: Check Image URLs

**For Firebase Storage URLs:**
- Should start with `https://firebasestorage.googleapis.com/`
- Should be publicly accessible (check Storage rules)

**For Local Paths:**
- Should start with `/Gallery/`
- File must exist in `client/public/Gallery/` folder

### Step 4: Test Image URLs Directly

Copy an image URL from Firestore and paste it in a new browser tab:
- If it loads → URL is correct, issue is in component
- If it doesn't load → URL is broken or permissions issue

## Common Issues & Solutions

### Issue 1: "No gallery items available"

**Possible Causes:**
- Firestore is empty (no data migrated)
- Firestore rules blocking read access
- Network error fetching from Firestore

**Solutions:**
1. Run migration: Admin Dashboard → Gallery → "🔄 Migrate Existing Data"
2. Check Firestore rules allow public read
3. Check browser console for specific errors

### Issue 2: Images show fallback logo

**Possible Causes:**
- Image URL is incorrect
- Image doesn't exist at that path
- CORS/permissions issue with Firebase Storage

**Solutions:**
1. Check browser console for "Image failed to load" errors
2. Verify image URL in Firestore document
3. Test URL directly in browser
4. Check Firebase Storage rules allow public read

### Issue 3: "Permission denied" error

**Possible Causes:**
- Firestore rules not set up
- Storage rules not set up

**Solutions:**
1. Go to Firebase Console → Firestore → Rules
2. Copy rules from `firebase-rules.txt`
3. Publish rules
4. Repeat for Storage rules

### Issue 4: Images load slowly or timeout

**Possible Causes:**
- Large image files
- Slow network connection
- Firebase Storage quota exceeded

**Solutions:**
1. Check image file sizes (should be < 10MB)
2. Optimize images before uploading
3. Check Firebase billing/quota

## Testing Checklist

- [ ] Browser console shows no errors
- [ ] Firestore has gallery documents
- [ ] Each document has valid `image` URL
- [ ] Image URLs load when pasted directly in browser
- [ ] Firestore rules allow public read
- [ ] Storage rules allow public read
- [ ] Gallery page shows items (or empty state message)
- [ ] Images display correctly (or show fallback)

## Quick Test Commands

Open browser console and run:

```javascript
// Check if Firestore is accessible
import { getGalleryItems } from './utils/galleryFirestore.js';
const items = await getGalleryItems();
console.log('Gallery items:', items);
console.log('First item image URL:', items[0]?.image);

// Test image URL
const img = new Image();
img.onload = () => console.log('Image loads successfully');
img.onerror = () => console.error('Image failed to load');
img.src = items[0]?.image;
```

## Next Steps

1. **If Firestore is empty:**
   - Run migration from Admin Dashboard
   - Or manually add items through Admin Panel

2. **If images don't load:**
   - Check console for specific error messages
   - Verify image URLs in Firestore
   - Test URLs directly in browser
   - Check Firebase Storage rules

3. **If nothing displays:**
   - Check browser console for errors
   - Verify Firestore rules are published
   - Check network tab for failed requests

