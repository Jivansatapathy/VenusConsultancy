# SEO Content Management - Testing Guide

This guide helps you test that SEO content changes go through the backend and immediately reflect in the frontend.

## Prerequisites

1. **Backend server running** on `http://localhost:5000`
2. **Frontend server running** on `http://localhost:5173`
3. **MongoDB running** and connected
4. **Admin user logged in**

## Quick Start Testing

### Step 1: Start Backend Server

```bash
cd server
npm run dev
```

Wait for:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

### Step 2: Start Frontend Server

```bash
cd client
npm run dev
```

Wait for:
```
  VITE v7.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

### Step 3: Login as Admin

1. Open browser: http://localhost:5173
2. Navigate to: http://localhost:5173/admin/login
3. Login with:
   - Email: `admin@venusconsultancy.com`
   - Password: (from your `.env` file `SEED_ADMIN_PASSWORD`)

### Step 4: Access SEO Content Manager

1. After login, go to Admin Dashboard
2. Click on "SEO Content" tab

## Testing SEO Content Changes

### Test 1: Verify Backend Connection

**What to check:**
- Open browser DevTools (F12)
- Go to Console tab
- Look for: `[SEO Content] Saving to backend:` logs
- Look for: `[SEO Content] ✅ Successfully saved to backend:` logs

**Steps:**
1. In SEO Content Manager, select "Home Page" → "Hero Section"
2. Change "Greeting Text" field (e.g., from "- Empower Your Workforce -" to "TEST CHANGE")
3. Watch the console - you should see:
   ```
   [SEO Content] Saving to backend: {page: "home", section: "hero", path: "home.hero.greeting", value: "TEST CHANGE"}
   [SEO Content] ✅ Successfully saved to backend: {success: true, ...}
   ```

### Test 2: Immediate Frontend Reflection

**What to check:**
- Changes should appear immediately in the form field
- No page refresh needed
- Changes persist after page refresh

**Steps:**
1. Change "Title Line 1" to "IMMEDIATE TEST"
2. **Verify immediately**: The field should show "IMMEDIATE TEST" right away
3. **Check Network tab**: You should see a POST request to `/api/content/save`
4. **Refresh the page** (F5)
5. **Verify persistence**: The field should still show "IMMEDIATE TEST"

### Test 3: Backend Verification

**What to check:**
- Verify data is actually in MongoDB
- Check backend logs for save operations

**Steps:**
1. Make a change in the frontend (e.g., change "Subtitle")
2. Check backend terminal - you should see:
   ```
   POST /api/content/save 200
   ```
3. Verify in database (optional):
   ```bash
   # Connect to MongoDB
   mongosh
   use venus-hiring
   db.contents.findOne()
   ```

### Test 4: Multiple Changes in Sequence

**What to check:**
- Multiple rapid changes should all save
- No conflicts or lost data

**Steps:**
1. Quickly change multiple fields:
   - Greeting: "Test 1"
   - Title Line 1: "Test 2"
   - Title Line 2: "Test 3"
   - Subtitle: "Test 4"
2. Check console - should see multiple save logs
3. Refresh page - all changes should persist

### Test 5: Error Handling

**What to check:**
- If backend is down, changes should revert
- Error messages should appear

**Steps:**
1. Make a change
2. Stop the backend server (Ctrl+C)
3. Make another change
4. Check console - should see error
5. Check UI - change should revert to previous value

### Test 6: Image Upload

**What to check:**
- Image uploads to backend
- Image URL saved to database
- Image displays immediately

**Steps:**
1. In Hero Section, click "Upload Image"
2. Select an image file
3. Watch console for upload logs
4. Check Network tab for POST to `/api/content/upload-image`
5. Verify image appears in preview
6. Refresh page - image should persist

## Browser DevTools Testing

### Console Tab

Watch for these logs:
- `[SEO Content] Saving to backend:` - When save starts
- `[SEO Content] ✅ Successfully saved to backend:` - When save succeeds
- `Error saving content to database:` - When save fails

### Network Tab

Filter by "content" and watch for:
- `GET /api/content` - Loading content on page load
- `POST /api/content/save` - Saving changes (should happen on every field change)
- `POST /api/content/upload-image` - Uploading images
- `POST /api/content/initialize` - Initializing base content

**Check Request Details:**
- Status: Should be `200` for successful saves
- Payload: Should contain `page`, `section`, and `data`
- Response: Should contain `success: true`

### Application Tab (Local Storage)

Check if any content is cached (should be minimal since we use backend)

## Automated Testing Script

Create a test script to verify backend saves:

```javascript
// test-seo-content.js
// Run this in browser console while on SEO Content page

async function testSEOContent() {
  console.log('🧪 Testing SEO Content Backend Integration...');
  
  // Test 1: Check if content loads from backend
  const response = await fetch('http://localhost:5000/api/content');
  const data = await response.json();
  console.log('✅ Content loaded from backend:', data);
  
  // Test 2: Make a test change
  const testValue = `TEST-${Date.now()}`;
  console.log('📝 Making test change:', testValue);
  
  // This would need to be done through the UI or API directly
  // For API test:
  const saveResponse = await fetch('http://localhost:5000/api/content/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // If stored
    },
    body: JSON.stringify({
      page: 'home',
      section: 'hero',
      data: {
        greeting: testValue,
        titleLine1: 'Test Title',
        titleLine2: 'Test Title 2'
      }
    })
  });
  
  const saveData = await saveResponse.json();
  console.log('✅ Save response:', saveData);
  
  // Test 3: Verify change persisted
  const verifyResponse = await fetch('http://localhost:5000/api/content/page/home');
  const verifyData = await verifyResponse.json();
  console.log('✅ Verified content:', verifyData);
  
  if (verifyData.data?.hero?.greeting === testValue) {
    console.log('🎉 SUCCESS: Change persisted in backend!');
  } else {
    console.log('❌ FAILED: Change not found in backend');
  }
}

// Run test
testSEOContent();
```

## Expected Behavior

### ✅ Correct Behavior

1. **Immediate UI Update**: Changes appear instantly in form fields
2. **Backend Save**: Every change triggers a POST to `/api/content/save`
3. **Persistence**: Changes remain after page refresh
4. **Error Handling**: Failed saves revert changes and show error
5. **Console Logs**: Clear logging of save operations

### ❌ Issues to Watch For

1. **No Backend Calls**: If Network tab shows no POST requests
2. **Delayed Updates**: If UI doesn't update immediately
3. **Lost Changes**: If changes disappear after refresh
4. **Silent Failures**: If saves fail without error messages
5. **Multiple Saves**: If one change triggers multiple save requests

## Troubleshooting

### Changes Not Saving

1. **Check Backend Running**: `curl http://localhost:5000/api/content`
2. **Check Authentication**: Verify admin is logged in
3. **Check Console**: Look for error messages
4. **Check Network Tab**: Verify POST requests are being made

### Changes Not Reflecting

1. **Check State Update**: Verify `setContent` is being called
2. **Check React DevTools**: Inspect component state
3. **Check Browser Cache**: Try hard refresh (Ctrl+Shift+R)

### Backend Errors

1. **Check Server Logs**: Look at backend terminal
2. **Check MongoDB**: Verify database connection
3. **Check Permissions**: Verify admin role has access

## Success Criteria

✅ **Test Passes If:**
- Changes appear immediately in UI
- Network tab shows POST to `/api/content/save`
- Console shows success logs
- Changes persist after page refresh
- Backend logs show save operations
- Database contains updated content

## Next Steps

After verifying everything works:
1. Test with different content types (text, images, arrays)
2. Test with multiple users (if applicable)
3. Test error scenarios (network failures, invalid data)
4. Performance test (many rapid changes)

