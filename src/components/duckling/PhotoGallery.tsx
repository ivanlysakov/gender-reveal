"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BabyDuckling from "./BabyDuckling";

interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  caption?: string;
  week?: string;
}

export default function PhotoGallery() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  // Sample media items - replace with actual ultrasound images/videos
  const mediaItems: MediaItem[] = [
    {
      id: "1",
      type: "image",
      url: "/images/ultrasound1.jpg",
      caption: "First glimpse of our little one",
      week: "12 weeks"
    },
    {
      id: "2",
      type: "image",
      url: "/images/ultrasound2.jpg",
      caption: "Growing strong!",
      week: "20 weeks"
    },
    {
      id: "3",
      type: "video",
      url: "/videos/ultrasound.mp4",
      caption: "Baby's first movements",
      week: "16 weeks"
    }
  ];

  return (
    <div className="duckling-card max-w-6xl mx-auto">
      <h3 className="duckling-title text-3xl text-center mb-2">
        Baby's First Photos 📸
      </h3>
      <p className="duckling-text text-center mb-8">
        Our journey from the very beginning
      </p>

      {/* Gallery Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {mediaItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
            onClick={() => setSelectedMedia(item)}
            className="media-frame"
          >
            {/* Placeholder for actual media */}
            <div className="media-placeholder">
              {item.type === "video" ? (
                <div className="video-placeholder">
                  <div className="play-button">▶️</div>
                  <p className="duckling-font text-sm mt-2">Video</p>
                </div>
              ) : (
                <div className="image-placeholder">
                  <BabyDuckling size={80} emotion="sleeping" animate={false} />
                  <p className="duckling-font text-xs mt-2">Ultrasound</p>
                </div>
              )}
            </div>
            
            {/* Caption */}
            <div className="p-4">
              <p className="duckling-font font-semibold">{item.caption}</p>
              {item.week && (
                <p className="duckling-text text-sm mt-1">{item.week}</p>
              )}
            </div>

            {/* Decorative corner */}
            <div className="corner-decoration">
              <span>👶</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <div className="timeline-section">
        <h4 className="duckling-font font-semibold text-xl mb-6 text-center">
          Our Growing Journey
        </h4>
        <div className="timeline">
          <div className="timeline-line" />
          {[
            { week: "8 weeks", event: "First heartbeat 💓", date: "March 2024" },
            { week: "12 weeks", event: "First ultrasound 📸", date: "April 2024" },
            { week: "16 weeks", event: "Baby's first kicks 👣", date: "May 2024" },
            { week: "20 weeks", event: "Anatomy scan 🏥", date: "June 2024" },
            { week: "Due Date", event: "December 2024 🎉", date: "Coming soon!" }
          ].map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            >
              <div className="timeline-content">
                <h5 className="duckling-font font-semibold">{milestone.week}</h5>
                <p className="duckling-text text-sm">{milestone.event}</p>
                <p className="duckling-text text-xs mt-1">{milestone.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            className="lightbox"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="lightbox-content"
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="close-button"
              >
                ✕
              </button>
              
              {/* Media Display */}
              <div className="media-display">
                {selectedMedia.type === "video" ? (
                  <div className="video-container">
                    <div className="video-placeholder-large">
                      <div className="play-button-large">▶️</div>
                      <p className="duckling-font text-lg mt-4">
                        Video Preview
                      </p>
                      <p className="duckling-text text-sm mt-2">
                        5-second ultrasound video
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="image-container">
                    <div className="image-placeholder-large">
                      <BabyDuckling size={200} emotion="sleeping" />
                      <p className="duckling-font text-lg mt-4">
                        Ultrasound Image
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className="mt-6 text-center">
                <p className="duckling-font font-semibold text-lg">
                  {selectedMedia.caption}
                </p>
                {selectedMedia.week && (
                  <p className="duckling-text mt-1">{selectedMedia.week}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS */}
      <style jsx>{`
        .media-frame {
          background: white;
          border: 3px solid #E8F5E9;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }

        .media-frame:hover {
          border-color: #A5D6A7;
          box-shadow: 0 8px 24px rgba(129, 199, 132, 0.2);
        }

        .media-placeholder,
        .image-placeholder,
        .video-placeholder {
          background: #F5FFF5;
          height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .video-placeholder {
          background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
        }

        .play-button {
          font-size: 3rem;
        }

        .corner-decoration {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #FFF59D;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transform: rotate(-15deg);
        }

        .timeline-section {
          margin-top: 3rem;
          padding: 2rem;
          background: #F5FFF5;
          border-radius: 20px;
        }

        .timeline {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #A5D6A7;
          transform: translateX(-50%);
        }

        .timeline-item {
          position: relative;
          margin: 2rem 0;
          width: 45%;
        }

        .timeline-item.left {
          text-align: right;
        }

        .timeline-item.right {
          margin-left: 55%;
          text-align: left;
        }

        .timeline-content {
          background: white;
          padding: 1.25rem;
          border-radius: 12px;
          border: 2px solid #E8F5E9;
          position: relative;
        }

        .timeline-item.left .timeline-content::after {
          content: '';
          position: absolute;
          right: -10px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 10px solid white;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
        }

        .timeline-item.right .timeline-content::after {
          content: '';
          position: absolute;
          left: -10px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-right: 10px solid white;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
        }

        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          cursor: pointer;
        }

        .lightbox-content {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          max-width: 90%;
          max-height: 90%;
          position: relative;
          cursor: default;
        }

        .close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #E8F5E9;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .close-button:hover {
          background: #C8E6C9;
          transform: rotate(90deg);
        }

        .video-placeholder-large,
        .image-placeholder-large {
          background: #F5FFF5;
          border-radius: 12px;
          padding: 3rem;
          text-align: center;
          min-width: 400px;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .play-button-large {
          font-size: 5rem;
        }

        @media (max-width: 768px) {
          .timeline-line {
            left: 20px;
          }

          .timeline-item {
            width: calc(100% - 40px);
            margin-left: 40px !important;
            text-align: left !important;
          }

          .timeline-item .timeline-content::after {
            left: -10px !important;
            right: auto !important;
            border-left: none !important;
            border-right: 10px solid white !important;
          }
        }
      `}</style>
    </div>
  );
}