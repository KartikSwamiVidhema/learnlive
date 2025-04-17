import React, { useState, useRef, useEffect } from "react";

const LazyImage = ({ src, alt, className, ...props }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={isIntersecting ? src : ""}
      alt={alt}
      className={`transition-opacity duration-500 ${isIntersecting ? "opacity-100" : "opacity-0"}  ${className} `}
      {...props}
    />
  );
};

export default LazyImage;