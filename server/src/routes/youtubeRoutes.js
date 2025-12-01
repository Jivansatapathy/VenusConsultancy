// server/src/routes/youtubeRoutes.js
import express from "express";
import axios from "axios";

const router = express.Router();

// Get YouTube videos from a channel (public endpoint)
router.get("/videos", async (req, res) => {
  try {
    const { channelHandle, channelId, maxResults = 12 } = req.query;
    
    // Hardcoded API key for now
    const apiKey = "AIzaSyBrGXFccE_qNIlL0k12KYNF8FJk1XNhx1A";
    
    // Hardcoded channel handle
    const handle = channelHandle || "venusconsultancy5699";

    // First, get channel ID from handle if channelId not provided
    let finalChannelId = channelId;
    
    if (!finalChannelId && handle) {
      try {
        // Try using forHandle parameter (for @username format)
        const channelResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels`,
          {
            params: {
              key: apiKey,
              forHandle: handle, // Use forHandle for @username format
              part: "id"
            }
          }
        );

        if (channelResponse.data.items && channelResponse.data.items.length > 0) {
          finalChannelId = channelResponse.data.items[0].id;
        }
      } catch (handleError) {
        // Fallback: search for channel by name
        try {
          const searchResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/search`,
            {
              params: {
                key: apiKey,
                q: handle,
                part: "snippet",
                type: "channel",
                maxResults: 1
              }
            }
          );

          if (searchResponse.data.items && searchResponse.data.items.length > 0) {
            finalChannelId = searchResponse.data.items[0].id.channelId;
          }
        } catch (searchError) {
          console.error("[Backend] Error resolving channel handle:", searchError);
        }
      }
    }

    if (!finalChannelId) {
      return res.status(400).json({ 
        error: "Channel ID or handle is required"
      });
    }

    // Fetch videos from YouTube Data API v3
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          key: apiKey,
          channelId: finalChannelId,
          part: "snippet,id",
          order: "date",
          maxResults: maxResults || 12,
          type: "video"
        }
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error.message || "Failed to fetch videos");
    }

    // Transform YouTube API response to our format
    const formattedVideos = response.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`
    }));

    res.json({
      success: true,
      videos: formattedVideos,
      total: formattedVideos.length
    });
  } catch (error) {
    console.error("[Backend] ❌ Error fetching YouTube videos:", error);
    
    if (error.response) {
      // YouTube API error
      res.status(error.response.status || 500).json({
        error: "YouTube API error",
        message: error.response.data?.error?.message || error.message
      });
    } else {
      res.status(500).json({
        error: "Failed to fetch YouTube videos",
        message: error.message
      });
    }
  }
});

export default router;

