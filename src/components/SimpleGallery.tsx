"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function SimpleGallery() {
  const t = useTranslations("gallery");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [videoRefs, setVideoRefs] = useState<{
    [key: string]: HTMLVideoElement | null;
  }>({});
  const [videosPlaying, setVideosPlaying] = useState<{
    [key: string]: boolean;
  }>({});

  // Gallery items
  const photos = [
    {
      id: "1",
      url: "/images/gallery/2.jpg",
      type: "image" as const,
      caption: t("photo2Caption"),
    },
    {
      id: "2",
      url: "/images/gallery/1.mp4",
      type: "video" as const,
      caption: t("photo1Caption"),
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
      url: "/images/gallery/6.MOV",
      type: "video" as const,
      caption: t("photo5Caption"),
    },
  ];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  }, [photos.length]);

  // Minimum swipe distance (in px)
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

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  // Reset image loaded state when changing images
  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  // Try to play video when index changes
  useEffect(() => {
    const currentPhoto = photos[currentIndex];
    if (currentPhoto.type === "video") {
      // Try to play with a small delay for iOS
      const timeoutId = setTimeout(() => {
        const video = videoRefs[currentPhoto.url];
        if (video) {
          video.play().catch((err) => {
            console.log("Autoplay prevented:", err);
            // Autoplay was prevented, user will need to click play
          });
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex]); // Remove videoRefs from dependencies to prevent infinite loop

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isFullscreen]);

  return (
    <>
      {/* Main Gallery */}
      <div className="relative max-w-5xl mx-auto">
        <div
          className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-2xl bg-white/20 backdrop-blur-sm shadow-2xl border border-white/30"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {photos[currentIndex].type === "image" ? (
            <div
              className="relative w-full h-full cursor-pointer"
              onClick={() => setIsFullscreen(true)}
            >
              {/* Click hint for mobile */}
              <div className="absolute top-4 left-0 right-0 flex justify-center z-10 md:hidden">
                <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                  <span className="animate-pulse">👆</span>
                  <span>Tap to view fullscreen</span>
                  <span className="animate-pulse">👆</span>
                </div>
              </div>
              <Image
                src={photos[currentIndex].url}
                alt={photos[currentIndex].caption || ""}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority
                onError={(e) =>
                  console.error(
                    "Image failed to load:",
                    photos[currentIndex].url
                  )
                }
              />
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Play button overlay for iOS */}
              {!videosPlaying[photos[currentIndex].url] && (
                <button
                  onClick={() => {
                    const video = videoRefs[photos[currentIndex].url];
                    if (video) {
                      video.play();
                      setVideosPlaying((prev) => ({
                        ...prev,
                        [photos[currentIndex].url]: true,
                      }));
                    }
                  }}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 md:hidden"
                >
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-0 h-0 border-l-[25px] border-l-gray-800 border-y-[15px] border-y-transparent ml-2" />
                  </div>
                </button>
              )}
              <video
                ref={(el) => {
                  if (el && !videoRefs[photos[currentIndex].url]) {
                    // Only set ref if it doesn't exist to prevent re-renders
                    videoRefs[photos[currentIndex].url] = el;
                  }
                }}
                key={photos[currentIndex].url}
                className="w-full h-full object-contain"
                controls
                muted
                autoPlay
                loop
                playsInline
                webkit-playsinline="true"
                onPlay={() => {
                  setVideosPlaying((prev) => {
                    if (prev[photos[currentIndex].url] !== true) {
                      return { ...prev, [photos[currentIndex].url]: true };
                    }
                    return prev;
                  });
                }}
                onPause={() => {
                  setVideosPlaying((prev) => {
                    if (prev[photos[currentIndex].url] !== false) {
                      return { ...prev, [photos[currentIndex].url]: false };
                    }
                    return prev;
                  });
                }}
                onLoadedMetadata={(e) => {
                  const video = e.currentTarget;
                  // Try to play when metadata is loaded
                  video.play().catch(() => {
                    console.log("Autoplay prevented on iOS");
                  });
                }}
              >
                <source
                  src={photos[currentIndex].url}
                  type={
                    photos[currentIndex].url.endsWith(".mp4")
                      ? "video/mp4"
                      : "video/quicktime"
                  }
                />
              </video>
            </div>
          )}
        </div>

        {/* Caption */}
        {photos[currentIndex].caption && (
          <div className="text-center mt-4">
            <p className="text-lg text-[#4A9B9B] font-medium">
              {photos[currentIndex].caption}
            </p>
          </div>
        )}

        {/* Swipe hint for mobile */}

        {/* Gallery Navigation */}
        <div className="flex justify-center items-center gap-4 mt-6">
          {/* Previous button */}
          <button
            onClick={handlePrev}
            className=" rounded-lg flex items-center justify-center shadow-lg transition-all !p-1 "
            aria-label="Previous photo"
          >
            <ChevronLeft />
          </button>

          {/* Dots */}
          <div className="flex  justify-center">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 !p-1  ${
                  index === currentIndex ? "scale-110" : "hover:scale-105"
                }`}
                aria-label={`Go to ${photo.type === "video" ? "video" : "photo"} ${index + 1}`}
              >
                {photo.type === "video" ? (
                  <div
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center ${
                      index === currentIndex ? "bg-pink-400" : "bg-gray-300"
                    }`}
                  >
                    <div className="w-0 h-0 border-l-[4px] sm:border-l-[5px] border-l-white border-y-[2.5px] sm:border-y-[3px] border-y-transparent ml-0.5" />
                  </div>
                ) : (
                  <div
                    className={`transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-pink-400 w-3 h-3 sm:w-8 sm:h-3"
                        : "bg-gray-300 w-3 h-3 sm:w-3 sm:h-3"
                    } rounded-full`}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            className=" rounded-full flex items-center justify-center  shadow-lg transition-all !p-1"
            aria-label="Next photo"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Fullscreen */}
      {isFullscreen && (
        <>
          <div
            className="fixed inset-0 bg-black"
            style={{ zIndex: 9998 }}
            onClick={() => setIsFullscreen(false)}
          />
          <div className="fixed inset-0" style={{ zIndex: 9999 }}>
            {/* Header - positioned absolutely */}
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-20">
              <button
                onClick={() => setIsFullscreen(false)}
                className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
              >
                ✕
              </button>
              <div className="text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {photos.length}
              </div>
            </div>

            {/* Image Container - full screen */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {photos[currentIndex].type === "image" ? (
                <div className="relative w-full h-full">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white">Loading...</div>
                    </div>
                  )}
                  <Image
                    src={photos[currentIndex].url}
                    alt={photos[currentIndex].caption || ""}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                    onLoad={() => setImageLoaded(true)}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <video
                    ref={(el) => {
                      if (el && !videoRefs[photos[currentIndex].url]) {
                        videoRefs[photos[currentIndex].url] = el;
                      }
                    }}
                    key={photos[currentIndex].url}
                    className="max-w-full max-h-full"
                    controls
                    muted
                    autoPlay
                    loop
                    playsInline
                    webkit-playsinline="true"
                    onPlay={() => {
                      setVideosPlaying((prev) => {
                        if (prev[photos[currentIndex].url] !== true) {
                          return { ...prev, [photos[currentIndex].url]: true };
                        }
                        return prev;
                      });
                    }}
                    onPause={() => {
                      setVideosPlaying((prev) => {
                        if (prev[photos[currentIndex].url] !== false) {
                          return { ...prev, [photos[currentIndex].url]: false };
                        }
                        return prev;
                      });
                    }}
                    onLoadedMetadata={(e) => {
                      const video = e.currentTarget;
                      video.play().catch(() => {
                        console.log("Autoplay prevented on iOS in fullscreen");
                      });
                    }}
                  >
                    <source
                      src={photos[currentIndex].url}
                      type={
                        photos[currentIndex].url.endsWith(".mp4")
                          ? "video/mp4"
                          : "video/quicktime"
                      }
                    />
                  </video>
                </div>
              )}
            </div>

            {/* Caption in fullscreen */}
            {photos[currentIndex].caption && (
              <div className="absolute bottom-20 left-0 right-0 flex justify-center z-20">
                <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full">
                  <p className="text-white text-lg font-medium">
                    {photos[currentIndex].caption}
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Navigation - positioned absolutely */}
            <div className="absolute left-0 right-0 bottom-8 flex justify-center items-center gap-4 z-20">
              {/* Dots */}
              <div className="flex gap-1.5">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-white w-2 h-2"
                        : "bg-white/40 w-1.5 h-1.5"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
