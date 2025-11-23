// client/src/components/BlogAdmin.jsx
import React, { useState } from 'react';
import { useSEOContent } from '../context/SEOContentContext';
import { uploadBlogImage } from '../utils/firebaseStorage.js';
import './BlogAdmin.css';

const BlogAdmin = () => {
  const { content, updateContent, updateNestedContent, addArrayItem, removeArrayItem } = useSEOContent();
  const blogData = content?.home?.blog || {};
  const blogPosts = blogData.items || [];
  const [editingIndex, setEditingIndex] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    excerpt: '',
    featuredImage: '',
    paragraph1: '',
    image1: '',
    paragraph2: '',
    image2: '',
    paragraph3: '',
    image3: '',
    paragraph4: '',
    image4: '',
    conclusion: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    readMoreUrl: '/blog',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [uploading, setUploading] = useState({});

  // Helper function to handle image upload for specific field
  const handleImageUpload = async (file, fieldName) => {
    setUploading(prev => ({ ...prev, [fieldName]: true }));
    try {
      const imageUrl = await uploadBlogImage(file);
      setFormData(prev => ({ ...prev, [fieldName]: imageUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleEdit = (index) => {
    const post = blogPosts[index];
    const slug = post.slug || '';
    
    // Handle backward compatibility - if old format exists, convert it
    let structuredData = {
      featuredImage: post.featuredImage || post.image || '',
      paragraph1: post.paragraph1 || '',
      image1: post.image1 || '',
      paragraph2: post.paragraph2 || '',
      image2: post.image2 || '',
      paragraph3: post.paragraph3 || '',
      image3: post.image3 || '',
      paragraph4: post.paragraph4 || '',
      image4: post.image4 || '',
      conclusion: post.conclusion || ''
    };

    // If old content format exists, put it in paragraph1
    if (post.content && !post.paragraph1) {
      structuredData.paragraph1 = post.content;
    }

    setFormData({
      slug: slug,
      title: post.title || '',
      excerpt: post.excerpt || '',
      ...structuredData,
      author: post.author || '',
      date: post.date || new Date().toISOString().split('T')[0],
      readMoreUrl: post.readMoreUrl || `/blog/${slug}`,
      tags: post.tags || []
    });
    setTagInput(post.tags ? post.tags.join(', ') : '');
    setEditingIndex(index);
    setShowAddForm(true);
  };

  const handleAdd = () => {
    const slug = `blog-${Date.now()}`;
    setFormData({
      slug: slug,
      title: '',
      excerpt: '',
      featuredImage: '',
      paragraph1: '',
      image1: '',
      paragraph2: '',
      image2: '',
      paragraph3: '',
      image3: '',
      paragraph4: '',
      image4: '',
      conclusion: '',
      author: '',
      date: new Date().toISOString().split('T')[0],
      readMoreUrl: `/blog/${slug}`,
      tags: []
    });
    setTagInput('');
    setEditingIndex(null);
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingIndex(null);
    setFormData({
      slug: '',
      title: '',
      excerpt: '',
      featuredImage: '',
      paragraph1: '',
      image1: '',
      paragraph2: '',
      image2: '',
      paragraph3: '',
      image3: '',
      paragraph4: '',
      image4: '',
      conclusion: '',
      author: '',
      date: new Date().toISOString().split('T')[0],
      readMoreUrl: '/blog',
      tags: []
    });
    setTagInput('');
    setUploading({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.slug || !formData.title) {
      alert('Slug and Title are required fields.');
      return;
    }

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      alert('Slug can only contain lowercase letters, numbers, and hyphens.');
      return;
    }

    // Parse tags
    const tags = tagInput.split(',').map(t => t.trim()).filter(t => t);

    // Ensure readMoreUrl is set based on slug
    const readMoreUrl = formData.readMoreUrl || `/blog/${formData.slug}`;
    
    const postData = {
      slug: formData.slug,
      title: formData.title,
      excerpt: formData.excerpt,
      featuredImage: formData.featuredImage,
      paragraph1: formData.paragraph1,
      image1: formData.image1,
      paragraph2: formData.paragraph2,
      image2: formData.image2,
      paragraph3: formData.paragraph3,
      image3: formData.image3,
      paragraph4: formData.paragraph4,
      image4: formData.image4,
      conclusion: formData.conclusion,
      author: formData.author,
      date: formData.date,
      readMoreUrl,
      tags
    };

    try {
      if (editingIndex !== null) {
        // Update existing post
        await updateNestedContent('home.blog.items', editingIndex, postData);
      } else {
        // Add new post
        await addArrayItem('home.blog.items', postData);
      }
      
      handleCancel();
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Failed to save blog post. Please try again.');
    }
  };

  const handleDelete = async (index) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      await removeArrayItem('home.blog.items', index);
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Failed to delete blog post. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
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

  // Component for image upload field
  const ImageUploadField = ({ fieldName, label }) => (
    <div className="form-group">
      <label>{label}</label>
      <div className="image-upload-section">
        {formData[fieldName] && (
          <div className="image-preview">
            <img src={getImageUrl(formData[fieldName])} alt="Preview" onError={(e) => {
              e.target.src = '/images/placeholder.jpg';
            }} />
            <button
              type="button"
              className="btn-remove-image"
              onClick={() => setFormData(prev => ({ ...prev, [fieldName]: '' }))}
            >
              Remove
            </button>
          </div>
        )}
        <div className="image-upload-controls">
          <label className="btn btn-secondary">
            {uploading[fieldName] ? 'Uploading...' : 'Upload Image'}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) handleImageUpload(file, fieldName);
              }}
              style={{ display: 'none' }}
              disabled={uploading[fieldName]}
            />
          </label>
          <input
            type="text"
            placeholder="Or enter image URL"
            value={formData[fieldName]}
            onChange={(e) => setFormData(prev => ({ ...prev, [fieldName]: e.target.value }))}
            className="image-url-input"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="blog-admin">
      <div className="blog-admin__header">
        <div>
          <h2>Blog Management</h2>
          <p>Manage your blog posts - add, edit, and delete articles</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={handleAdd}
          disabled={showAddForm}
        >
          + Add New Blog Post
        </button>
      </div>

      {/* Blog Section Settings */}
      <div className="blog-admin__settings">
        <h3>Blog Section Settings</h3>
        <div className="blog-admin__settings-grid">
          <div className="form-group">
            <label>Heading</label>
            <input
              type="text"
              value={blogData.heading || ''}
              onChange={(e) => updateContent('home.blog.heading', e.target.value)}
              placeholder="Insights & Articles"
            />
          </div>
          <div className="form-group">
            <label>Subheading</label>
            <input
              type="text"
              value={blogData.subheading || ''}
              onChange={(e) => updateContent('home.blog.subheading', e.target.value)}
              placeholder="Latest thinking on hiring..."
            />
          </div>
          <div className="form-group">
            <label>Read More URL</label>
            <input
              type="text"
              value={blogData.readMoreUrl || ''}
              onChange={(e) => updateContent('home.blog.readMoreUrl', e.target.value)}
              placeholder="/blog"
            />
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="blog-admin__form-modal">
          <div className="blog-admin__form-content">
            <div className="blog-admin__form-header">
              <h3>{editingIndex !== null ? 'Edit Blog Post' : 'Add New Blog Post'}</h3>
              <button className="btn-close" onClick={handleCancel}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="blog-admin__form">
              <div className="form-row">
                <div className="form-group">
                  <label>Slug *</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => {
                      const newSlug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                      setFormData(prev => ({ 
                        ...prev, 
                        slug: newSlug,
                        readMoreUrl: `/blog/${newSlug}`
                      }));
                    }}
                    placeholder="blog-post-slug"
                    required
                    pattern="[a-z0-9-]+"
                    title="Only lowercase letters, numbers, and hyphens allowed"
                  />
                  <small>URL-friendly identifier (e.g., "how-to-hire-remote-engineers")</small>
                </div>

                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Blog Post Title"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Excerpt (for preview - 1-2 lines)</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the blog post (shown in preview cards)..."
                  rows={2}
                />
                <small>This will be shown in the blog preview cards. Keep it short (1-2 lines).</small>
              </div>

              {/* Featured Image */}
              <ImageUploadField fieldName="featuredImage" label="Featured Image *" />

              {/* Paragraph 1 */}
              <div className="form-group">
                <label>Paragraph 1 *</label>
                <textarea
                  value={formData.paragraph1}
                  onChange={(e) => setFormData(prev => ({ ...prev, paragraph1: e.target.value }))}
                  placeholder="First paragraph of your blog post..."
                  rows={4}
                  style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}
                />
              </div>

              {/* Image 1 */}
              <ImageUploadField fieldName="image1" label="Image 1" />

              {/* Paragraph 2 */}
              <div className="form-group">
                <label>Paragraph 2</label>
                <textarea
                  value={formData.paragraph2}
                  onChange={(e) => setFormData(prev => ({ ...prev, paragraph2: e.target.value }))}
                  placeholder="Second paragraph..."
                  rows={4}
                  style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}
                />
              </div>

              {/* Image 2 */}
              <ImageUploadField fieldName="image2" label="Image 2" />

              {/* Paragraph 3 */}
              <div className="form-group">
                <label>Paragraph 3</label>
                <textarea
                  value={formData.paragraph3}
                  onChange={(e) => setFormData(prev => ({ ...prev, paragraph3: e.target.value }))}
                  placeholder="Third paragraph..."
                  rows={4}
                  style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}
                />
              </div>

              {/* Image 3 */}
              <ImageUploadField fieldName="image3" label="Image 3" />

              {/* Paragraph 4 */}
              <div className="form-group">
                <label>Paragraph 4</label>
                <textarea
                  value={formData.paragraph4}
                  onChange={(e) => setFormData(prev => ({ ...prev, paragraph4: e.target.value }))}
                  placeholder="Fourth paragraph..."
                  rows={4}
                  style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}
                />
              </div>

              {/* Image 4 */}
              <ImageUploadField fieldName="image4" label="Image 4" />

              {/* Conclusion */}
              <div className="form-group">
                <label>Conclusion</label>
                <textarea
                  value={formData.conclusion}
                  onChange={(e) => setFormData(prev => ({ ...prev, conclusion: e.target.value }))}
                  placeholder="Conclusion paragraph..."
                  rows={4}
                  style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="Author Name"
                  />
                </div>

                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Read More URL</label>
                <input
                  type="text"
                  value={formData.readMoreUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, readMoreUrl: e.target.value }))}
                  placeholder="/blog/post-slug"
                />
              </div>

              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Hiring, Engineering, Recruitment"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={Object.values(uploading).some(v => v)}
                >
                  {editingIndex !== null ? 'Update Post' : 'Add Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog Posts List */}
      <div className="blog-admin__list">
        <h3>Blog Posts ({blogPosts.length})</h3>
        {blogPosts.length === 0 ? (
          <div className="blog-admin__empty">
            <p>No blog posts yet. Click "Add New Blog Post" to create your first post.</p>
          </div>
        ) : (
          <div className="blog-admin__table-container">
            <table className="blog-admin__table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>Tags</th>
                  <th>Slug</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogPosts.map((post, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{post.title || 'Untitled'}</strong>
                      {post.excerpt && (
                        <div className="post-excerpt">{post.excerpt.substring(0, 60)}...</div>
                      )}
                    </td>
                    <td>{post.author || 'N/A'}</td>
                    <td>{formatDate(post.date)}</td>
                    <td>
                      {post.tags && post.tags.length > 0 ? (
                        <div className="tags-list">
                          {post.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="tag">{tag}</span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="tag-more">+{post.tags.length - 3}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted">No tags</span>
                      )}
                    </td>
                    <td>
                      <code>{post.slug || 'N/A'}</code>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => handleEdit(index)}
                          disabled={showAddForm}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(index)}
                          disabled={showAddForm}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogAdmin;
