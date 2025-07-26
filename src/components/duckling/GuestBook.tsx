"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BabyDuckling from "./BabyDuckling";

interface GuestEntry {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
  reaction?: string;
}

export default function GuestBook() {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedReaction, setSelectedReaction] = useState("");

  const reactions = ["❤️", "🦆", "👶", "🎉", "💚", "💛", "🌟", "😊"];

  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem("guestBookEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const handleSubmit = () => {
    if (!userName.trim() || !message.trim()) return;

    const newEntry: GuestEntry = {
      id: Date.now().toString(),
      name: userName,
      message: message,
      timestamp: new Date(),
      reaction: selectedReaction || undefined
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("guestBookEntries", JSON.stringify(updatedEntries));

    // Reset form
    setMessage("");
    setSelectedReaction("");
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="duckling-card max-w-4xl mx-auto">
      <div className="flex items-center justify-center gap-4 mb-6">
        <BabyDuckling size={60} emotion="happy" animate={false} />
        <h3 className="duckling-title text-3xl text-center">
          Guest Book & Comments 💌
        </h3>
        <BabyDuckling size={60} emotion="happy" animate={false} />
      </div>
      
      <p className="duckling-text text-center mb-8">
        Leave your wishes and love for the baby!
      </p>

      {/* Entry Form */}
      <div className="mb-8 p-6 rounded-2xl" style={{ backgroundColor: "#F5FFF5" }}>
        <div className="mb-4">
          <label className="duckling-font font-medium block mb-2">
            Your Name:
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name..."
            className="duckling-input"
          />
        </div>

        <div className="mb-4">
          <label className="duckling-font font-medium block mb-2">
            Your Message:
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your wishes, advice, or love for the baby..."
            className="duckling-input duckling-textarea"
            rows={4}
          />
        </div>

        <div className="mb-6">
          <label className="duckling-font font-medium block mb-3">
            Add a reaction (optional):
          </label>
          <div className="flex gap-3 flex-wrap">
            {reactions.map((reaction) => (
              <motion.button
                key={reaction}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedReaction(
                  selectedReaction === reaction ? "" : reaction
                )}
                className={`reaction-button ${
                  selectedReaction === reaction ? "selected" : ""
                }`}
              >
                <span className="text-2xl">{reaction}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={!userName.trim() || !message.trim()}
            className="duckling-button duckling-button-primary"
          >
            Sign Guest Book 📝
          </button>
        </div>
      </div>

      {/* Guest Book Entries */}
      {entries.length > 0 && (
        <div>
          <h4 className="duckling-font font-semibold text-xl mb-4">
            Messages from Loved Ones ({entries.length})
          </h4>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="guestbook-entry-card"
              >
                <div className="flex items-start gap-4">
                  {/* Profile Avatar */}
                  <div 
                    className="avatar"
                    style={{ backgroundColor: `hsl(${Math.random() * 360}, 70%, 85%)` }}
                  >
                    {entry.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Entry Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="duckling-font font-semibold">
                        {entry.name}
                        {entry.reaction && (
                          <span className="ml-2 text-xl">{entry.reaction}</span>
                        )}
                      </h5>
                      <span className="duckling-text text-xs">
                        {formatDate(entry.timestamp)}
                      </span>
                    </div>
                    <p className="duckling-text whitespace-pre-wrap">
                      {entry.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="stat-card">
              <div className="text-3xl mb-2">💬</div>
              <p className="duckling-font font-bold text-xl">{entries.length}</p>
              <p className="duckling-text text-sm">Messages</p>
            </div>
            <div className="stat-card">
              <div className="text-3xl mb-2">❤️</div>
              <p className="duckling-font font-bold text-xl">
                {entries.filter(e => e.reaction === "❤️").length}
              </p>
              <p className="duckling-text text-sm">Hearts</p>
            </div>
            <div className="stat-card">
              <div className="text-3xl mb-2">🦆</div>
              <p className="duckling-font font-bold text-xl">
                {entries.filter(e => e.reaction === "🦆").length}
              </p>
              <p className="duckling-text text-sm">Ducks</p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {entries.length === 0 && (
        <div className="text-center py-12">
          <BabyDuckling size={100} emotion="curious" />
          <p className="duckling-text mt-4">
            Be the first to sign the guest book!
          </p>
        </div>
      )}

      {/* CSS */}
      <style jsx>{`
        .reaction-button {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          border: 2px solid #E8F5E9;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reaction-button:hover {
          border-color: #A5D6A7;
          background: #F5FFF5;
        }

        .reaction-button.selected {
          border-color: #66BB6A;
          background: #E8F5E9;
        }

        .guestbook-entry-card {
          background: white;
          border: 2px solid #E8F5E9;
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .guestbook-entry-card:hover {
          border-color: #A5D6A7;
          box-shadow: 0 4px 12px rgba(129, 199, 132, 0.15);
          transform: translateY(-2px);
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.25rem;
          color: white;
          flex-shrink: 0;
        }

        .stat-card {
          background: #F5FFF5;
          border-radius: 12px;
          padding: 1.5rem;
          border: 2px solid #E8F5E9;
        }
      `}</style>
    </div>
  );
}