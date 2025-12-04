# Firebase Security Rules Setup Guide

## Quick Setup Instructions

### Step 1: Set Firestore Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **venusglobal-847ea**
3. Click **Firestore Database** in the left menu
4. Click on the **Rules** tab
5. Copy and paste the **FIRESTORE RULES** from `firebase-rules.txt`
6. Click **Publish**

### Step 2: Set Storage Rules

1. In Firebase Console, click **Storage** in the left menu
2. Click on the **Rules** tab
3. Copy and paste the **STORAGE RULES** from `firebase-rules.txt`
4. Click **Publish**

## Rules Explanation

### Firestore Rules (`gallery` collection)

```javascript
match /gallery/{document=**} {
  allow read: if true;                    // Anyone can read
  allow create, update, delete: if request.auth != null;  // Only logged-in users
}
```

**What this means:**
- ✅ **Public Read**: Anyone can view gallery items (needed for public gallery page)
- ✅ **Authenticated Write**: Only logged-in users (admins) can add/edit/delete

### Storage Rules (`gallery-images/` folder)

```javascript
match /gallery-images/{allPaths=**} {
  allow read: if true;                    // Anyone can view images
  allow write: if request.auth != null    // Only logged-in users can upload
    && request.resource.size < 10 * 1024 * 1024  // 10MB file size limit
    && request.resource.contentType.matches('image/.*');  // Only image files
}
```

**What this means:**
- ✅ **Public Read**: Anyone can view gallery images
- ✅ **Authenticated Write**: Only logged-in users can upload
- ✅ **File Size Limit**: Maximum 10MB per image
- ✅ **File Type Restriction**: Only image files allowed

## Testing the Rules

### Test 1: Public Read Access
1. Open your gallery page in an incognito/private window (not logged in)
2. Gallery items and images should load ✅

### Test 2: Admin Write Access
1. Log in as admin
2. Go to Admin Dashboard → Gallery
3. Try to add a new gallery item
4. Upload should work ✅

### Test 3: Unauthenticated Write (Should Fail)
1. Log out
2. Try to add a gallery item (if you have a way to do this)
3. Should be blocked ❌

## Production Rules (Optional)

For production, you can use more restrictive rules that require admin custom claims:

### Setting Admin Custom Claims

You would need to set custom claims in your backend when a user logs in as admin:

```javascript
// In your backend (Node.js)
admin.auth().setCustomUserClaims(uid, { admin: true });
```

Then use the production rules that check for `request.auth.token.admin == true`.

## Troubleshooting

### Error: "Permission denied"
- **Solution**: Make sure rules are published in Firebase Console
- Check that you're logged in when trying to write

### Error: "Missing or insufficient permissions"
- **Solution**: Verify rules syntax is correct
- Check that collection name matches: `gallery` (not `galleries`)

### Error: "Index required"
- **Solution**: Go to Firestore → Indexes → Create Index
- Collection: `gallery`
- Field: `id`, Order: Descending

### Images not uploading
- **Solution**: Check Storage rules are published
- Verify file size is under 10MB
- Verify file is an image type

## Current Rules Summary

| Resource | Read Access | Write Access |
|----------|------------|--------------|
| Firestore `gallery` | Public (anyone) | Authenticated users |
| Storage `gallery-images/` | Public (anyone) | Authenticated users |

## Security Notes

⚠️ **Current rules allow any authenticated user to write.** 

For better security in production:
1. Use admin custom claims (see Production Rules above)
2. Or implement role-based access control in your backend
3. Or restrict write access to specific user IDs

The current setup is suitable for:
- Development/testing
- Small teams where all users are trusted admins
- Applications where authentication already ensures admin access

