# YouTube Videos Integration Setup

This guide explains how to set up YouTube video integration in the Gallery section.

## Overview

The Gallery page now automatically fetches and displays YouTube videos from your channel. New videos are automatically fetched every 5 minutes.

## Setup Steps

### 1. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy your API key

### 2. Get Your YouTube Channel ID

1. Go to your YouTube channel
2. Click on "About" tab
3. Your Channel ID is displayed under "Channel details"
   - Format: `UCxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Or use your custom URL username

### 3. Configure Environment Variables

#### Backend (Server)

Add to your `.env` file in the `server` directory:

```env
YOUTUBE_API_KEY=your_youtube_api_key_here
```

#### Frontend (Client)

Add to your `.env` file in the `client` directory:

```env
VITE_YOUTUBE_CHANNEL_ID=your_channel_id_here
```

### 4. Restart Your Servers

After adding the environment variables, restart both:
- Backend server
- Frontend development server

## How It Works

1. **Backend Endpoint**: `/api/youtube/videos`
   - Securely fetches videos from YouTube API
   - Keeps API key on server (not exposed to frontend)
   - Returns formatted video data

2. **Frontend Component**: `YouTubeVideos`
   - Fetches videos from backend endpoint
   - Displays video thumbnails in a grid
   - Automatically refreshes every 5 minutes
   - Opens videos in YouTube when clicked

3. **Auto-Refresh**: 
   - Videos are fetched on component mount
   - Automatically refreshes every 5 minutes
   - New videos appear automatically when uploaded

## Features

- ✅ Automatic video fetching
- ✅ Auto-refresh every 5 minutes
- ✅ Responsive grid layout
- ✅ Video thumbnails with play button
- ✅ Click to open in YouTube
- ✅ Secure API key handling (backend only)
- ✅ Error handling and loading states

## Troubleshooting

### Videos not showing?

1. Check that `YOUTUBE_API_KEY` is set in backend `.env`
2. Check that `VITE_YOUTUBE_CHANNEL_ID` is set in frontend `.env`
3. Verify YouTube Data API v3 is enabled in Google Cloud Console
4. Check browser console for error messages
5. Verify your API key has proper permissions

### API Quota Exceeded?

YouTube API has daily quotas. If exceeded:
- Wait for quota reset (usually daily)
- Consider reducing refresh frequency
- Use API key with higher quota limits

## Customization

You can customize the number of videos displayed by changing the `maxResults` prop in `Gallery.jsx`:

```jsx
<YouTubeVideos 
  channelId={import.meta.env.VITE_YOUTUBE_CHANNEL_ID || ""}
  maxResults={20} // Change this number
/>
```

