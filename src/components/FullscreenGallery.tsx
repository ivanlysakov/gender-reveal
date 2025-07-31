"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface FullscreenGalleryProps {
  photos: Array<{
    id: string;
    url: string;
    type: "image" | "video";
    caption?: string;
  }>;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
}

export default function FullscreenGallery({
  photos,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  onGoTo,
}: FullscreenGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    
    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      onNext();
    }
    if (isRightSwipe) {
      onPrev();
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black z-[2147483647] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === containerRef.current) {
          onClose();
        }
      }}
    >
      {/* Main content area */}
      <div 
        className="relative w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {photos[currentIndex].type === "image" ? (
          <Image
            src={photos[currentIndex].url}
            alt={photos[currentIndex].caption || "Gallery image"}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        ) : (
          <video
            key={photos[currentIndex].url}
            className="w-full h-full object-contain"
            controls
            muted
            playsInline
            controlsList="nodownload"
          >
            <source
              src={photos[currentIndex].url}
              type={
                photos[currentIndex].url.endsWith(".mp4")
                  ? "video/mp4"
                  : "video/quicktime"
              }
            />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center pointer-events-auto">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-white/90 hover:text-white transition-colors"
            aria-label="Close fullscreen"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <span className="text-white/90 text-sm font-medium">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>

        {/* Navigation areas */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1/3 pointer-events-auto" 
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }} 
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-auto" 
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }} 
        />

        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-auto">
          {photos[currentIndex].caption && (
            <div className="px-4 pb-2">
              <p className="text-white/90 text-center text-sm">
                {photos[currentIndex].caption}
              </p>
            </div>
          )}

          <div className="flex justify-center items-center gap-1.5 pb-8">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  onGoTo(index);
                }}
                className={`rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-white w-2 h-2" 
                    : "bg-white/40 w-1.5 h-1.5"
                }`}
                aria-label={`Go to ${photo.type === "video" ? "video" : "photo"} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}