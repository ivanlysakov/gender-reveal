"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface Photo {
  id: string;
  url: string;
  caption?: string;
  category: "pregnancy" | "ultrasound" | "general";
}

export default function PhotoGallery() {
  const t = useTranslations("gallery");
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "pregnancy" | "ultrasound" | "general"
  >("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Mock photos data - will be replaced with Convex data
  const [photos] = useState<Photo[]>([
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1544951300-0ddb5b3ab466?w=400&h=400&fit=crop&crop=center",
      caption: t("photo1Caption"),
      category: "pregnancy",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
      caption: t("photo2Caption"),
      category: "ultrasound",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1555252333-9f8e71b79c6c?w=400&h=400&fit=crop&crop=center",
      caption: t("photo3Caption"),
      category: "pregnancy",
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1595121983361-973a8b4e6ba3?w=400&h=400&fit=crop&crop=center",
      caption: t("photo3DCaption"),
      category: "ultrasound",
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&h=400&fit=crop&crop=center",
      caption: t("photo4Caption"),
      category: "general",
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1555252310-9ad0d9fb107e?w=400&h=400&fit=crop&crop=center",
      caption: t("photo5Caption"),
      category: "pregnancy",
    },
  ]);

  const categories = [
    {
      id: "all",
      label: t("allPhotos"),
      icon: "📷",
      gradient: "from-gray-500 to-slate-500",
      bgGradient: "from-gray-50 to-slate-50",
    },
    {
      id: "pregnancy",
      label: t("pregnancyJourney"),
      icon: "🤰",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
    },
    {
      id: "ultrasound",
      label: t("ultrasounds"),
      icon: "👶",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      id: "general",
      label: t("preparations"),
      icon: "🍼",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50",
    },
  ];

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const selectedCategoryData =
    categories.find((cat) => cat.id === selectedCategory) || categories[0];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Enhanced Category Filter */}
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as any)}
            className={`group relative px-8 py-4 rounded-full font-bold text-lg transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 ${
              selectedCategory === category.id
                ? "text-white shadow-2xl scale-110 -translate-y-1"
                : "text-gray-700 hover:text-white"
            }`}
          >
            {/* Animated background */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-full transition-all duration-500 ${
                selectedCategory === category.id
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
              }`}
            ></div>

            {/* Static background for unselected state */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${category.bgGradient} rounded-full transition-all duration-500 border border-white/40 ${
                selectedCategory === category.id
                  ? "opacity-0"
                  : "opacity-100 group-hover:opacity-0"
              }`}
            ></div>

            {/* Content */}
            <span className="relative flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              {category.label}
            </span>

            {/* Selection indicator */}
            {selectedCategory === category.id && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Enhanced Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className="group relative cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background glow effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${selectedCategoryData.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500 scale-110`}
            ></div>

            {/* Main card */}
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl border border-white/40 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500 group-hover:shadow-2xl">
              {/* Image container */}
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={photo.url}
                  alt={photo.caption || "Gallery photo"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Floating action button */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                  🔍
                </div>

                {/* Category badge */}
                <div
                  className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${selectedCategoryData.gradient} text-white rounded-full text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0`}
                >
                  {photo.category}
                </div>
              </div>

              {/* Caption */}
              {photo.caption && (
                <div className="p-6">
                  <p className="text-gray-800 font-medium text-center group-hover:text-gray-900 transition-colors duration-300">
                    {photo.caption}
                  </p>
                </div>
              )}

              {/* Decorative elements */}
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse delay-200"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Empty State */}
      {filteredPhotos.length === 0 && (
        <div className="text-center py-20">
          <div className="relative group max-w-lg mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300/20 to-slate-300/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-white/40">
              <div className="text-8xl mb-6 animate-bounce">📷</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                No photos yet
              </h3>
              <p className="text-xl text-gray-600">
                Check back soon for more beautiful memories!
              </p>
              <div className="flex justify-center gap-2 mt-6">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-400"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-5xl max-h-full group">
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-16 right-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl hover:bg-white/20 transition-all duration-300 z-10 group-hover:scale-110"
            >
              ✕
            </button>

            {/* Modal content */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500">
              {/* Image */}
              <div className="relative aspect-square max-w-3xl max-h-[80vh]">
                <Image
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption || "Gallery photo"}
                  fill
                  className="object-cover"
                />

                {/* Gradient overlay for caption */}
                {selectedPhoto.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                    <p className="text-white text-xl font-medium text-center">
                      {selectedPhoto.caption}
                    </p>
                  </div>
                )}
              </div>

              {/* Additional caption area if needed */}
              {selectedPhoto.caption && (
                <div className="p-8 bg-white">
                  <div className="flex justify-center items-center gap-4 mb-4">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-gray-300 rounded-full"></div>
                    <span className="text-2xl">✨</span>
                    <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-gray-300 rounded-full"></div>
                  </div>
                  <p className="text-gray-800 text-xl text-center font-medium">
                    {selectedPhoto.caption}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Upload Section */}
      <div className="mt-20 text-center">
        <div className="relative group max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-300/20 via-purple-300/20 to-pink-300/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
          <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-12 border-2 border-dashed border-gray-300 hover:border-purple-300 transition-all duration-500">
            <div className="text-8xl mb-6 animate-bounce">📸</div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              More Memories Coming Soon!
            </h3>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-6">
              We&apos;ll be adding more beautiful moments from our pregnancy
              journey. Stay tuned for updates!
            </p>
            <div className="flex justify-center gap-3 text-3xl">
              <span className="animate-bounce">💕</span>
              <span className="animate-bounce delay-200">👶</span>
              <span className="animate-bounce delay-400">✨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
