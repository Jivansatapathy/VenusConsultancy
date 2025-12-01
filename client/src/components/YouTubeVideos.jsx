// client/src/components/YouTubeVideos.jsx
import React, { useState, useEffect } from "react";
import API from "../utils/api";
import "./YouTubeVideos.css";

const YouTubeVideos = ({ maxResults = 12 }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded playlist ID
  const playlistId = "PL7_T4oO_C6rWX50IcHwrGXTkx_3Ks2T7V";

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch videos from our backend API (which calls YouTube API securely)
      const response = await API.get("/youtube/videos", {
        params: {
          playlistId: playlistId,
          maxResults: maxResults
        }
      });

      if (response.data.success && response.data.videos) {
        setVideos(response.data.videos);
      } else {
        throw new Error(response.data.message || "Failed to fetch videos");
      }
    } catch (err) {
      console.error("Error fetching YouTube videos:", err);
      setError(err.response?.data?.message || err.message || "Unable to load videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
    
    // Refresh videos every 5 minutes to get new uploads automatically
    const refreshInterval = setInterval(() => {
      fetchVideos();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(refreshInterval);
  }, [maxResults]);

  const openVideoModal = (video) => {
    // Open video in modal or new tab
    window.open(video.videoUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="youtube-videos-section">
        <div className="youtube-videos-container">
          <h2 className="youtube-videos-title">Our YouTube Videos</h2>
          <div className="youtube-videos-loading">Loading videos...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="youtube-videos-section">
        <div className="youtube-videos-container">
          <h2 className="youtube-videos-title">Our YouTube Videos</h2>
          <div className="youtube-videos-error">
            Unable to load videos. Please check your YouTube API configuration.
          </div>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="youtube-videos-section">
      <div className="youtube-videos-container">
        <div className="youtube-videos-header">
          <h2 className="youtube-videos-title">Our YouTube Videos</h2>
          <p className="youtube-videos-subtitle">
            Watch our latest videos from events, conferences, and more
          </p>
        </div>
        
        <div className="youtube-videos-grid">
          {videos.map((video) => (
            <div
              key={video.id}
              className="youtube-video-item"
              onClick={() => openVideoModal(video)}
            >
              <div className="youtube-video-thumbnail-wrapper">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="youtube-video-thumbnail"
                  loading="lazy"
                />
                <div className="youtube-video-play-button">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="youtube-video-duration">
                  {/* Duration can be fetched from video details API if needed */}
                </div>
              </div>
              <div className="youtube-video-info">
                <h3 className="youtube-video-title">{video.title}</h3>
                <p className="youtube-video-meta">
                  {new Date(video.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouTubeVideos;

