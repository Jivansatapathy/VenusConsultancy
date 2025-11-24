// client/src/pages/Blog.jsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSEOContent } from "../context/SEOContentContext";
import blogConfig from "../data/blogConfig.js";
import BlogPostDetail from "./BlogPostDetail";
import "./Blog.css";

const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
};

const Blog = () => {
  const { slug } = useParams();
  const { content } = useSEOContent();
  
  // If slug exists, show individual post detail
  if (slug) {
    return <BlogPostDetail />;
  }

  // Otherwise show blog list
  const seoBlog = content?.home?.blog;
  const blogData = seoBlog?.items?.length > 0 ? seoBlog : blogConfig;
  const { heading, subheading, items = [] } = blogData || {};

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/images/placeholder.jpg';
    // Firebase Storage URLs are already full HTTPS URLs
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    // Legacy backend images (for backward compatibility)
    if (imageUrl.startsWith('/api/')) {
      return imageUrl;
    }
    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }
    // Fallback for old format
    return `/api/content${imageUrl}`;
  };

  const truncateExcerpt = (text, maxLength = 120) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="blog-page">
      <div className="blog-page__container">
        <header className="blog-page__header">
          <h1 className="blog-page__title">{heading || "Blog"}</h1>
          {subheading && <p className="blog-page__subtitle">{subheading}</p>}
        </header>

        {items.length === 0 ? (
          <div className="blog-page__empty">
            <p>No blog posts available yet.</p>
          </div>
        ) : (
          <div className="blog-page__grid">
            {items.map((post) => {
              const postUrl = `/blog/${post.slug}`;
              return (
                <article key={post.slug} className="blog-page__card">
                  <Link to={postUrl} className="blog-page__image-link">
                    <div className="blog-page__image-wrapper">
                      <img 
                        src={getImageUrl(post.featuredImage || post.image)} 
                        alt={post.title || 'Blog post'} 
                        loading="lazy" 
                        decoding="async"
                        onError={(e) => {
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                  </Link>

                  <div className="blog-page__content">
                    {post.tags?.length > 0 && (
                      <div className="blog-page__tags">
                        {post.tags.map((tag, idx) => (
                          <span key={idx} className="blog-page__tag">{tag}</span>
                        ))}
                      </div>
                    )}

                    <h2 className="blog-page__post-title">
                      <Link to={postUrl}>{post.title || 'Untitled'}</Link>
                    </h2>

                    {post.excerpt && (
                      <p className="blog-page__excerpt">{truncateExcerpt(post.excerpt)}</p>
                    )}

                    <div className="blog-page__meta">
                      {post.author && (
                        <span className="blog-page__author">By {post.author}</span>
                      )}
                      {post.date && (
                        <span className="blog-page__date">{formatDate(post.date)}</span>
                      )}
                    </div>

                    <Link to={postUrl} className="blog-page__read-more">
                      Read more →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

