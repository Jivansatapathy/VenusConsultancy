// client/src/components/BlogSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSEOContent } from "../context/SEOContentContext";
import "./BlogSection.css";
import blogConfig from "../data/blogConfig.js";

const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
};

const BlogSection = () => {
  const { content } = useSEOContent();
  const seoBlog = content?.home?.blog;
  const blogData = seoBlog?.items?.length > 0 ? seoBlog : blogConfig;
  const { heading, subheading, items, readMoreUrl } = blogData;
  const visible = items.slice(0, 3);

  return (
    <section className="vh-blog" aria-labelledby="vh-blog-heading">
      <div className="vh-blog__card">
        <header className="vh-blog__header">
          <h2 id="vh-blog-heading" className="vh-blog__heading">{heading}</h2>
          {subheading && <p className="vh-blog__sub">{subheading}</p>}
        </header>

        <div className="vh-blog__grid">
          {visible.map((b) => {
            const postUrl = `/blog/${b.slug}`;
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
            // No need for truncateExcerpt anymore - CSS handles it with line-clamp
            
            // Generate excerpt from paragraph1 if excerpt is not available (for new structured format)
            const getExcerpt = () => {
              if (b.excerpt) return b.excerpt;
              if (b.paragraph1) {
                const text = b.paragraph1.replace(/\n/g, ' ').trim();
                return text.length > 150 ? text.substring(0, 150) + '...' : text;
              }
              return '';
            };

            return (
              <article key={b.slug} className="vh-blog__item">
                <Link to={postUrl} className="vh-blog__media-link" aria-label={`Read full article: ${b.title}`}>
                  <div className="vh-blog__media">
                    <img 
                      src={getImageUrl(b.featuredImage || b.image)} 
                      alt={b.title} 
                      loading="lazy" 
                      decoding="async"
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                </Link>

                <div className="vh-blog__content">
                  {b.tags?.length > 0 && (
                    <div className="vh-blog__meta">
                      {b.tags.slice(0, 2).map((t) => (
                        <span key={t} className="vh-blog__tag">{t}</span>
                      ))}
                    </div>
                  )}

                  <h3 className="vh-blog__title">
                    <Link to={postUrl}>{b.title}</Link>
                  </h3>

                  <p className="vh-blog__excerpt">{getExcerpt()}</p>

                <Link to={postUrl} className="vh-blog__readlink">
                  Read more →
                </Link>
              </div>
            </article>
            );
          })}
        </div>

        <div className="vh-blog__more">
          <a href={readMoreUrl} className="btn btn--primary">View all articles</a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
