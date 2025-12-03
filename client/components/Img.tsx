"use client";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "./ui/skeleton";

type Props = {
  src: string;
  alt: string;
  available?: boolean;
  className?: string;
  skeletonClassName?: string;
};

export default function Img({
  src,
  alt,
  className = "",
  skeletonClassName = "w-full h-56 rounded-lg",
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // ✅ Fix for cached images — check if already loaded
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <>
      {!loaded && <Skeleton className={skeletonClassName} />}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        loading="lazy"
      />
    </>
  );
}
