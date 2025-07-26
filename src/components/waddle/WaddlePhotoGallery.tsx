"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const photos = [
  { id: 1, src: "/api/placeholder/400/300", caption: "Our journey begins" },
  { id: 2, src: "/api/placeholder/400/300", caption: "Sharing the news" },
  { id: 3, src: "/api/placeholder/400/300", caption: "First ultrasound" },
  { id: 4, src: "/api/placeholder/400/300", caption: "Growing love" },
  { id: 5, src: "/api/placeholder/400/300", caption: "Preparing the nursery" },
  { id: 6, src: "/api/placeholder/400/300", caption: "Baby shower memories" },
];

export default function WaddlePhotoGallery() {
  const t = useTranslations("gallery");
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <div className="waddle-card">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setSelectedPhoto(photo.id)}
          >
            <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-pink-100 to-blue-100">
              <div className="flex items-center justify-center">
                <span className="text-6xl opacity-50">👶</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold">{photo.caption}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8 p-8 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200"
      >
        <p className="script-font text-2xl mb-2" style={{ color: "var(--waddle-yellow)" }}>
          {t("moreMemoriesComingSoon")}
        </p>
        <p className="sans-font text-gray-600">
          Check back after the party for all the special moments!
        </p>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 text-white text-4xl hover:scale-110 transition-transform"
              >
                ×
              </button>
              <div className="bg-white rounded-3xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-pink-100 to-blue-100">
                  <div className="flex items-center justify-center">
                    <span className="text-9xl opacity-50">👶</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="script-font text-2xl text-center" style={{ color: "var(--waddle-pink)" }}>
                    {photos.find(p => p.id === selectedPhoto)?.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}