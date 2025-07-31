"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function MobilePhotoGallery() {
  const t = useTranslations("gallery");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Gallery items
  const photos = [
    {
      id: "1",
      url: "/images/gallery/1.mp4",
      type: "video" as const,
      caption: t("photo1Caption"),
    },
    {
      id: "2",
      url: "/images/gallery/2.jpg",
      type: "image" as const,
      caption: t("photo2Caption"),
    },
    {
      id: "3",
      url: "/images/gallery/3.jpg",
      type: "image" as const,
      caption: t("photo3Caption"),
    },
    {
      id: "4",
      url: "/images/gallery/4.jpg",
      type: "image" as const,
      caption: t("photo3DCaption"),
    },
    {
      id: "5",
      url: "/images/gallery/5.jpg",
      type: "image" as const,
      caption: t("photo4Caption"),
    },
    {
      id: "6",
      url: "/images/gallery/6.mov",
      type: "video" as const,
      caption: t("photo5Caption"),
    },
  ];

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      
      if (e.key === 'Escape') {
        closeFullscreen();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, currentIndex]);

  // Prevent body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isFullscreen]);

  return (
    <>
      {/* Main Gallery Container */}
      <div className="relative max-w-5xl mx-auto">
        <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-sm shadow-2xl border border-white/20">
          {/* Current Item */}
          <div
            className="relative w-full h-full"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {photos[currentIndex].type === "image" ? (
              <div 
                className="relative w-full h-full cursor-pointer"
                onClick={openFullscreen}
              >
                <Image
                  src={photos[currentIndex].url}
                  alt={photos[currentIndex].caption || "Gallery image"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                />
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain rounded-lg cursor-pointer"
                  controls
                  muted
                  loop
                  playsInline
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <source
                    src={photos[currentIndex].url}
                    type={photos[currentIndex].url.endsWith(".mp4") ? "video/mp4" : "video/quicktime"}
                  />
                </video>
              </div>
            )}

            {/* Caption Overlay */}
            {photos[currentIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pointer-events-none">
                <p className="text-white text-center text-sm md:text-base">
                  {photos[currentIndex].caption}
                </p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 shadow-lg transition-all ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:scale-110'
            }`}
            aria-label="Previous photo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            disabled={currentIndex === photos.length - 1}
            className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 shadow-lg transition-all ${
              currentIndex === photos.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:scale-110'
            }`}
            aria-label="Next photo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 ${
                index === currentIndex ? 'scale-110' : 'hover:scale-105'
              }`}
              aria-label={`Go to ${photo.type === "video" ? "video" : "photo"} ${index + 1}`}
            >
              {photo.type === "video" ? (
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    index === currentIndex ? 'bg-pink-400' : 'bg-gray-300'
                  }`}
                >
                  <div className="w-0 h-0 border-l-[5px] border-l-white border-y-[3px] border-y-transparent ml-0.5" />
                </div>
              ) : (
                <div
                  className={`transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-pink-400 w-8 h-3' 
                      : 'bg-gray-300 w-3 h-3'
                  } rounded-full`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black flex flex-col"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 999999
          }}
        >
          {/* Header with close button and counter */}
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-50">
            <button
              onClick={closeFullscreen}
              className="w-10 h-10 flex items-center justify-center text-white bg-black/50 rounded-full"
              aria-label="Close fullscreen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-white bg-black/50 px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {photos.length}
            </div>
          </div>

          {/* Image/Video Container */}
          <div
            className="flex-1 relative w-full h-full flex items-center justify-center"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {photos[currentIndex].type === "image" ? (
              <div className="relative w-full h-full">
                <Image
                  src={photos[currentIndex].url}
                  alt={photos[currentIndex].caption || "Gallery image"}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                  style={{ objectFit: 'contain' }}
                />
              </div>
            ) : (
              <video
                className="max-w-full max-h-full"
                controls
                muted
                playsInline
                style={{ maxHeight: '90vh' }}
              >
                <source
                  src={photos[currentIndex].url}
                  type={photos[currentIndex].url.endsWith(".mp4") ? "video/mp4" : "video/quicktime"}
                />
              </video>
            )}
          </div>

          {/* Navigation Areas (invisible) */}
          {photos[currentIndex].type === "image" && (
            <>
              <button
                className="absolute left-0 top-0 w-1/3 h-full"
                onClick={goToPrev}
                disabled={currentIndex === 0}
                aria-label="Previous image"
              />
              <button
                className="absolute right-0 top-0 w-1/3 h-full"
                onClick={goToNext}
                disabled={currentIndex === photos.length - 1}
                aria-label="Next image"
              />
            </>
          )}

          {/* Caption */}
          {photos[currentIndex].caption && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
              <p className="text-white text-center text-sm">
                {photos[currentIndex].caption}
              </p>
            </div>
          )}

          {/* Bottom Navigation Dots */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-1.5">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-white w-2 h-2' 
                    : 'bg-white/40 w-1.5 h-1.5'
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}