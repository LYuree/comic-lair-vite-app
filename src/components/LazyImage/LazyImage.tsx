// src/components/LazyImage/LazyImage.tsx
import { FC, useState, useRef, useEffect, memo } from "react";
import { Box, Skeleton } from "@mui/material";

export interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  placeholder?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
  // WebP support with fallback
  webpSrc?: string;
  priority?: boolean; // For above-the-fold images
}

const LazyImage: FC<LazyImageProps> = memo(
  ({
    src,
    alt,
    className,
    width,
    height,
    placeholder,
    onLoad,
    onError,
    webpSrc,
    priority = false,
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority); // Load immediately if priority
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (priority) return; // Skip observer for priority images

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect(); // Stop observing once loaded
          }
        },
        {
          threshold: 0.1, // Trigger when 10% visible
          rootMargin: "50px", // Start loading 50px before entering viewport
        }
      );

      const currentContainer = containerRef.current;
      if (currentContainer) {
        observer.observe(currentContainer);
      }

      return () => observer.disconnect();
    }, [priority]);

    const handleImageLoad = () => {
      new Promise((resolve) => setTimeout(() => resolve(true), 2000)).then(
        () => {
          setIsLoaded(true);
          onLoad?.();
        }
      );
    };

    const handleImageError = () => {
      setHasError(true);
      onError?.();
    };

    // Determine which image source to use (WebP with fallback)
    const imageSrc = webpSrc && supportsWebP() ? webpSrc : src;

    return (
      <Box
        ref={containerRef}
        className={className}
        sx={{
          width: width || "100%",
          height: height || "auto",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {!isInView &&
          !priority &&
          (placeholder || (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={height || "200px"}
              animation="pulse"
            />
          ))}

        {isInView && (
          <>
            {!isLoaded && !hasError && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={height || "200px"}
                animation="pulse"
                sx={{ position: "absolute", top: 0, left: 0 }}
              />
            )}

            <img
              ref={imgRef}
              src={imageSrc}
              alt={alt}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: isLoaded ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
              }}
              loading={priority ? "eager" : "lazy"} // Native lazy loading as backup
            />

            {hasError && (
              <Box
                sx={{
                  width: "100%",
                  height: height || "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "grey.200",
                  color: "text.secondary",
                }}
              >
                Не удалось загрузить изображение
              </Box>
            )}
          </>
        )}
      </Box>
    );
  }
);

// WebP support detection
function supportsWebP(): boolean {
  if (typeof window === "undefined") return false;

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  return canvas.toDataURL("image/webp").startsWith("data:image/webp");
}

export default LazyImage;
