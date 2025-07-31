"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SimpleGallery() {
  const t = useTranslations("gallery");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
      url: "/images/gallery/6.MOV",
      type: "video" as const,
      caption: t("photo5Caption"),
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  // Reset image loaded state when changing images
  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  return (
    <>
      {/* Main Gallery */}
      <div className="relative max-w-5xl mx-auto">
        <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-2xl bg-white/20 backdrop-blur-sm shadow-2xl border border-white/30">
          {photos[currentIndex].type === "image" ? (
            <div
              className="relative w-full h-full cursor-pointer"
              onClick={() => setIsFullscreen(true)}
            >
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
              <video
                className="w-full h-full object-contain"
                controls
                muted
                playsInline
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

        {/* Gallery Navigation */}
        <div className="flex justify-center items-center gap-4 mt-6">
          {/* Previous button */}
          <button
            onClick={handlePrev}
            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-800 hover:bg-white shadow-lg transition-all"
            aria-label="Previous photo"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex ? "scale-110" : "hover:scale-105"
                }`}
                aria-label={`Go to ${photo.type === "video" ? "video" : "photo"} ${index + 1}`}
              >
                {photo.type === "video" ? (
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      index === currentIndex ? "bg-pink-400" : "bg-gray-300"
                    }`}
                  >
                    <div className="w-0 h-0 border-l-[5px] border-l-white border-y-[3px] border-y-transparent ml-0.5" />
                  </div>
                ) : (
                  <div
                    className={`transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-pink-400 w-8 h-3"
                        : "bg-gray-300 w-3 h-3"
                    } rounded-full`}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-800 hover:bg-white shadow-lg transition-all"
            aria-label="Next photo"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
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
            <div className="absolute inset-0 flex items-center justify-center">
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
                    className="max-w-full max-h-full"
                    controls
                    muted
                    playsInline
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
