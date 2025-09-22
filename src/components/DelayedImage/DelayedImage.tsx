// src/components/LazyImage/DelayedImage.tsx
import { FC, useState, useEffect } from "react";
import LazyImage, { LazyImageProps } from "../LazyImage/LazyImage";
import { Skeleton } from "@mui/material";

interface DelayedImageProps extends LazyImageProps {
  delayMs?: number; // Delay in milliseconds before the image starts loading
}

const DelayedImage: FC<DelayedImageProps> = ({
  delayMs = 1500,
  src,
  ...rest
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldLoad(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return shouldLoad ? (
    <LazyImage src={src} {...rest} />
  ) : (
    // Show placeholder or skeleton while delay is active
    rest.placeholder ?? (
      <Skeleton
        variant="rectangular"
        width={rest.width || "100%"}
        height={rest.height || 200}
        animation="wave"
        sx={{ borderRadius: 1 }}
      />
    )
  );
};

export default DelayedImage;
