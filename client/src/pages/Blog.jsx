// client/src/pages/Blog.jsx
import React from "react";
import { useSEOContent } from "../context/SEOContentContext";
import blogConfig from "../data/blogConfig.js";
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
  const { content } = useSEOContent();
  const seoBlog = content?.home?.blog;
  const blogData = seoBlog?.items?.length > 0 ? seoBlog : blogConfig;
  const { heading, subheading, items = [] } = blogData || {};

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
            {items.map((post) => (
              <article key={post.slug} className="blog-page__card">
                <a href={post.readMoreUrl || '#'} className="blog-page__image-link">
                  <div className="blog-page__image-wrapper">
                    <img 
                      src={post.image || '/images/placeholder.jpg'} 
                      alt={post.title || 'Blog post'} 
                      loading="lazy" 
                      decoding="async" 
                    />
                  </div>
                </a>

                <div className="blog-page__content">
                  {post.tags?.length > 0 && (
                    <div className="blog-page__tags">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="blog-page__tag">{tag}</span>
                      ))}
                    </div>
                  )}

                  <h2 className="blog-page__post-title">
                    <a href={post.readMoreUrl || '#'}>{post.title || 'Untitled'}</a>
                  </h2>

                  {post.excerpt && (
                    <p className="blog-page__excerpt">{post.excerpt}</p>
                  )}

                  <div className="blog-page__meta">
                    {post.author && (
                      <span className="blog-page__author">By {post.author}</span>
                    )}
                    {post.date && (
                      <span className="blog-page__date">{formatDate(post.date)}</span>
                    )}
                  </div>

                  <a href={post.readMoreUrl || '#'} className="blog-page__read-more">
                    Read more →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

