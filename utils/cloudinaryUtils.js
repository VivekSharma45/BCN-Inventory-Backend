import cloudinary from '../config/cloudinary.js';

// Function to delete image from Cloudinary
export const deleteImageFromCloudinary = async (imageUrl) => {
    try {
        if (!imageUrl) return;
        
        // Extract public_id from Cloudinary URL
        const publicId = imageUrl.split('/').pop().split('.')[0];
        const folder = 'bcn-inventory';
        const fullPublicId = `${folder}/${publicId}`;
        
        const result = await cloudinary.uploader.destroy(fullPublicId);
        console.log('Image deleted from Cloudinary:', result);
        return result;
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }
};

// Function to delete multiple images from Cloudinary
export const deleteMultipleImagesFromCloudinary = async (imageUrls) => {
    try {
        if (!imageUrls || !Array.isArray(imageUrls)) return;
        
        const deletePromises = imageUrls.map(url => deleteImageFromCloudinary(url));
        await Promise.all(deletePromises);
        console.log('Multiple images deleted from Cloudinary');
    } catch (error) {
        console.error('Error deleting multiple images from Cloudinary:', error);
        throw error;
    }
};
