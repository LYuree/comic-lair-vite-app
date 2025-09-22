// src/utils/optimizeImage.ts

/**
 * Generates WebP URL from original image URL
 * Assumes your images are hosted on a service that supports format conversion
 */
export const getWebPUrl = (originalUrl: string): string => {
  // If using a service like Cloudinary, ImageKit, or custom CDN
  // Example for different services:

  // For Cloudinary: add f_webp parameter
  if (originalUrl.includes("cloudinary.com")) {
    return originalUrl.replace("/upload/", "/upload/f_webp,q_auto/");
  }

  // For your current hosting (iili.io) - check if WebP version exists
  if (originalUrl.includes("iili.io")) {
    // Replace extension with .webp
    return originalUrl.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  }

  // Generic fallback - try replacing extension
  return originalUrl.replace(/\.(jpg|jpeg|png)$/i, ".webp");
};

/**
 * Gets responsive image sources for different screen sizes
 */
export const getResponsiveImageSrc = (baseUrl: string) => {
  return {
    mobile: baseUrl.replace(/\.(jpg|jpeg|png|webp)$/i, "_360w.$1"),
    tablet: baseUrl.replace(/\.(jpg|jpeg|png|webp)$/i, "_768w.$1"),
    desktop: baseUrl,
  };
};

/**
 * Preloads critical images for better performance
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};
