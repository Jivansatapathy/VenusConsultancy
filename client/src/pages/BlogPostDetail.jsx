// client/src/pages/BlogPostDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSEOContent } from '../context/SEOContentContext';
import API from '../utils/api';
import './BlogPostDetail.css';

const BlogPostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { content } = useSEOContent();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // First try to get from context
        const blogData = content?.home?.blog;
        const blogPosts = blogData?.items || [];
        const foundPost = blogPosts.find(p => p.slug === slug);

        if (foundPost) {
          setPost(foundPost);
        } else {
          // If not in context, fetch from API
          try {
            const response = await API.get(`/content/blog/${slug}`);
            setPost(response.data);
          } catch (apiError) {
            console.error('Error fetching blog post:', apiError);
            setError('Blog post not found');
          }
        }
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug, content]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

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

  if (loading) {
    return (
      <div className="blog-post-detail">
        <div className="blog-post-detail__container">
          <div className="blog-post-detail__loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-detail">
        <div className="blog-post-detail__container">
          <div className="blog-post-detail__error">
            <h2>Post Not Found</h2>
            <p>{error || 'The blog post you are looking for does not exist.'}</p>
            <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-detail">
      <div className="blog-post-detail__container">
        <Link to="/blog" className="blog-post-detail__back">
          ← Back to Blog
        </Link>

        <article className="blog-post-detail__article">
          {/* Featured Image - Use featuredImage first, fallback to image for backward compatibility */}
          {(post.featuredImage || post.image) && (
            <div className="blog-post-detail__image">
              <img 
                src={getImageUrl(post.featuredImage || post.image)} 
                alt={post.title || 'Blog post'} 
              />
            </div>
          )}

          <header className="blog-post-detail__header">
            {post.tags && post.tags.length > 0 && (
              <div className="blog-post-detail__tags">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="blog-post-detail__tag">{tag}</span>
                ))}
              </div>
            )}

            <h1 className="blog-post-detail__title">{post.title || 'Untitled'}</h1>

            <div className="blog-post-detail__meta">
              {post.author && (
                <span className="blog-post-detail__author">By {post.author}</span>
              )}
              {post.date && (
                <span className="blog-post-detail__date">{formatDate(post.date)}</span>
              )}
            </div>
          </header>

          <div className="blog-post-detail__content">
            {/* New Structured Format: paragraph1, image1, paragraph2, image2, etc. */}
            {(post.paragraph1 || post.image1 || post.paragraph2 || post.image2 || 
              post.paragraph3 || post.image3 || post.paragraph4 || post.image4 || post.conclusion) ? (
              <div className="blog-post-detail__body">
                {/* Paragraph 1 */}
                {post.paragraph1 && (
                  <div className="blog-post-detail__paragraph">
                    {post.paragraph1.split('\n').map((para, idx) => (
                      para.trim() ? <p key={idx}>{para}</p> : <br key={idx} />
                    ))}
                  </div>
                )}

                {/* Image 1 */}
                {post.image1 && (
                  <div className="blog-post-detail__content-image">
                    <img 
                      src={getImageUrl(post.image1)} 
                      alt={post.title || 'Blog post image 1'} 
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Paragraph 2 */}
                {post.paragraph2 && (
                  <div className="blog-post-detail__paragraph">
                    {post.paragraph2.split('\n').map((para, idx) => (
                      para.trim() ? <p key={idx}>{para}</p> : <br key={idx} />
                    ))}
                  </div>
                )}

                {/* Image 2 */}
                {post.image2 && (
                  <div className="blog-post-detail__content-image">
                    <img 
                      src={getImageUrl(post.image2)} 
                      alt={post.title || 'Blog post image 2'} 
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Paragraph 3 */}
                {post.paragraph3 && (
                  <div className="blog-post-detail__paragraph">
                    {post.paragraph3.split('\n').map((para, idx) => (
                      para.trim() ? <p key={idx}>{para}</p> : <br key={idx} />
                    ))}
                  </div>
                )}

                {/* Image 3 */}
                {post.image3 && (
                  <div className="blog-post-detail__content-image">
                    <img 
                      src={getImageUrl(post.image3)} 
                      alt={post.title || 'Blog post image 3'} 
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Paragraph 4 */}
                {post.paragraph4 && (
                  <div className="blog-post-detail__paragraph">
                    {post.paragraph4.split('\n').map((para, idx) => (
                      para.trim() ? <p key={idx}>{para}</p> : <br key={idx} />
                    ))}
                  </div>
                )}

                {/* Image 4 */}
                {post.image4 && (
                  <div className="blog-post-detail__content-image">
                    <img 
                      src={getImageUrl(post.image4)} 
                      alt={post.title || 'Blog post image 4'} 
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Conclusion */}
                {post.conclusion && (
                  <div className="blog-post-detail__paragraph blog-post-detail__conclusion">
                    {post.conclusion.split('\n').map((para, idx) => (
                      para.trim() ? <p key={idx}>{para}</p> : <br key={idx} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Backward Compatibility: Old format with content or excerpt */
              post.content ? (
                <div className="blog-post-detail__body">
                  {post.content.split('\n').map((paragraph, index) => {
                    if (paragraph.trim() === '') {
                      return <br key={index} />;
                    }
                    return <p key={index}>{paragraph}</p>;
                  })}
                </div>
              ) : post.excerpt ? (
                <div className="blog-post-detail__body">
                  {post.excerpt.split('\n').map((paragraph, index) => {
                    if (paragraph.trim() === '') {
                      return <br key={index} />;
                    }
                    return <p key={index}>{paragraph}</p>;
                  })}
                </div>
              ) : null
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostDetail;

