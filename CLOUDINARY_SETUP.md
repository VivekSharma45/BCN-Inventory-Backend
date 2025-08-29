# Cloudinary Setup Guide

## Prerequisites
1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Get your Cloudinary credentials from your dashboard

## Environment Variables
Add the following variables to your `.env` file:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## How to get Cloudinary credentials:

1. **Cloud Name**: Found in your Cloudinary dashboard URL (e.g., if your dashboard URL is `https://cloudinary.com/console/dashboard/abc123`, your cloud name is `abc123`)

2. **API Key**: Found in your Cloudinary dashboard under "Account Details" > "API Key"

3. **API Secret**: Found in your Cloudinary dashboard under "Account Details" > "API Secret"

## Features Added:

- ✅ Images are automatically uploaded to Cloudinary
- ✅ Images are stored in a folder called "bcn-inventory"
- ✅ Automatic image optimization (800x600 max dimensions, auto quality)
- ✅ Support for multiple image formats (jpg, jpeg, png, gif, webp)
- ✅ Automatic cleanup of images when products are deleted
- ✅ Cloudinary URLs are stored in the database instead of local filenames

## Installation:

After adding your environment variables, install the new dependencies:

```bash
npm install
```

## Usage:

The application will now automatically:
- Upload images to Cloudinary when creating/updating products
- Store Cloudinary URLs in the database
- Delete images from Cloudinary when products are deleted
- Serve images directly from Cloudinary CDN
