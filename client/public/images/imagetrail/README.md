# ImageTrail Images

This folder contains images for the ImageTrail component on the About Us page.

## Required Images

Place the following images in this folder:

- `image1.jpg` - First image in the trail
- `image2.jpg` - Second image in the trail
- `image3.jpg` - Third image in the trail
- `image4.jpg` - Fourth image in the trail
- `image5.jpg` - Fifth image in the trail
- `image6.jpg` - Sixth image in the trail
- `image7.jpg` - Seventh image in the trail
- `image8.jpg` - Eighth image in the trail
- `image9.jpg` - Ninth image in the trail
- `image10.jpg` - Tenth image in the trail
- `image11.jpg` - Eleventh image in the trail
- `image12.jpg` - Twelfth image in the trail

## Image Specifications

- **Format**: JPG, PNG, or WEBP
- **Size**: Recommended 300x300px or similar square aspect ratio
- **Quality**: High quality images work best
- **Content**: Professional photos, team members, office spaces, or company-related imagery

## How It Works

The ImageTrail component will cycle through these images when users hover over the hero section on the About Us page. The images will appear in a trail effect following the mouse cursor.

## Adding More Images

If you want to add more images:

1. Add the new image files to this folder
2. Update the `items` array in `client/src/pages/AboutUs.jsx`
3. Add the new image paths to the array

Example:
```javascript
items={[
  '/images/imagetrail/image1.jpg',
  '/images/imagetrail/image2.jpg',
  // ... existing images
  '/images/imagetrail/image13.jpg', // New image
]}
```
