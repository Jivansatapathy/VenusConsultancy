# Gallery Images

## How to Add Images

1. Place your images in this folder (`client/public/Gallery/`)
2. Update the `galleryData` array in `client/src/pages/Gallery.jsx` with your image information

## Image Requirements

- **Supported formats**: JPG, JPEG, PNG, WEBP
- **Recommended sizes**:
  - Landscape images: 1920x1080px or similar 16:9 aspect ratio
  - Portrait images: 1080x1920px or similar 9:16 aspect ratio
- **File naming**: Use descriptive names like `event-2024-tech-summit.jpg`

## Adding a New Gallery Item

Edit `client/src/pages/Gallery.jsx` and add a new object to the `galleryData` array:

```javascript
{
  id: 7, // Unique ID
  image: "/Gallery/your-image-name.jpg", // Path relative to public folder
  eventName: "Event Name",
  date: "Month Day, Year",
  location: "City, State",
  description: "Brief description of the event",
  attendees: "Person A met with Person B",
  orientation: "landscape" // or "portrait"
}
```

## Image Orientation

- Set `orientation: "landscape"` for wide images (16:9 aspect ratio)
- Set `orientation: "portrait"` for tall images (9:16 aspect ratio)

The gallery will automatically display images in the correct fixed size based on their orientation.

