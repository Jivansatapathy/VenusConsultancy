// server/src/routes/youtubeRoutes.js
import express from "express";
import axios from "axios";

const router = express.Router();

// Get YouTube videos from a playlist (public endpoint)
router.get("/videos", async (req, res) => {
  try {
    const { playlistId, maxResults = 12 } = req.query;
    
    // Hardcoded API key and playlist ID
    const apiKey = "AIzaSyBrGXFccE_qNIlL0k12KYNF8FJk1XNhx1A";
    const playlist = playlistId || "PL7_T4oO_C6rWX50IcHwrGXTkx_3Ks2T7V";

    // Fetch videos from YouTube playlist
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems`,
      {
        params: {
          key: apiKey,
          playlistId: playlist,
          part: "snippet,contentDetails",
          maxResults: maxResults || 12
        }
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error.message || "Failed to fetch videos");
    }

    // Transform YouTube API response to our format and filter out deleted videos
    const formattedVideos = response.data.items
      .filter((item) => {
        // Filter out deleted/private videos
        // Deleted videos often have missing snippet or title like "Deleted video" or "Private video"
        const title = item.snippet?.title || "";
        const videoId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
        
        // Check if video is deleted or private
        if (!videoId) return false;
        if (title.toLowerCase().includes("deleted video")) return false;
        if (title.toLowerCase().includes("private video")) return false;
        if (!item.snippet?.thumbnails) return false; // Missing thumbnails often indicate deleted videos
        
        return true;
      })
      .map((item) => {
        const videoId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
        return {
          id: videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
          publishedAt: item.snippet.publishedAt,
          channelTitle: item.snippet.channelTitle,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          embedUrl: `https://www.youtube.com/embed/${videoId}`
        };
      })
      .filter(video => video.id && video.thumbnail); // Final filter to ensure we have valid video ID and thumbnail

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

