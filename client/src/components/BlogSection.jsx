// client/src/components/BlogSection.jsx
import React from "react";
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
  const { heading, subheading, items, readMoreUrl } = blogConfig;
  const visible = items.slice(0, 3);

  return (
    <section className="vh-blog" aria-labelledby="vh-blog-heading">
      <div className="vh-blog__card">
        <header className="vh-blog__header">
          <h2 id="vh-blog-heading" className="vh-blog__heading">{heading}</h2>
          {subheading && <p className="vh-blog__sub">{subheading}</p>}
        </header>

        <div className="vh-blog__grid">
          {visible.map((b) => (
            <article key={b.slug} className="vh-blog__item">
              <a href={b.readMoreUrl} className="vh-blog__media-link" aria-label={`Read full article: ${b.title}`}>
                <div className="vh-blog__media">
                  <img src={b.image} alt={b.title} loading="lazy" />
                </div>
              </a>

              <div className="vh-blog__content">
                {b.tags?.length > 0 && (
                  <div className="vh-blog__meta">
                    {b.tags.slice(0, 2).map((t) => (
                      <span key={t} className="vh-blog__tag">{t}</span>
                    ))}
                  </div>
                )}

                <h3 className="vh-blog__title">
                  <a href={b.readMoreUrl}>{b.title}</a>
                </h3>

                <p className="vh-blog__excerpt">{b.excerpt}</p>

                {/* Small text link instead of button */}
                <a href={b.readMoreUrl} className="vh-blog__readlink">
                  Read more →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="vh-blog__more">
          <a href={readMoreUrl} className="btn btn--primary">View all articles</a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
