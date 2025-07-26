"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface AstrologyVote {
  name: string;
  sign: "sagittarius" | "capricorn";
}

export default function AstrologyPrediction() {
  const [selectedSign, setSelectedSign] = useState<"sagittarius" | "capricorn" | null>(null);
  const [userName, setUserName] = useState("");
  const [votes, setVotes] = useState<AstrologyVote[]>([]);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (!userName.trim() || !selectedSign) return;

    const newVote: AstrologyVote = {
      name: userName,
      sign: selectedSign
    };

    setVotes([...votes, newVote]);
    setHasVoted(true);
  };

  const sagittariusVotes = votes.filter(v => v.sign === "sagittarius").length;
  const capricornVotes = votes.filter(v => v.sign === "capricorn").length;

  return (
    <div className="duckling-card max-w-4xl mx-auto">
      <h3 className="duckling-title text-3xl text-center mb-2">
        Guess the Zodiac Sign! ✨
      </h3>
      <p className="duckling-text text-center mb-8">
        Baby is due in early December... Will they be a Sagittarius or Capricorn?
      </p>

      {!hasVoted ? (
        <>
          <div className="mb-6">
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

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedSign("sagittarius")}
              className={`astrology-card ${selectedSign === "sagittarius" ? "selected" : ""}`}
            >
              <div className="text-5xl mb-3">♐</div>
              <h4 className="duckling-font font-bold text-xl mb-2">Sagittarius</h4>
              <p className="text-sm duckling-text mb-3">Nov 22 - Dec 21</p>
              <p className="text-sm duckling-text">
                Adventurous, optimistic, and freedom-loving
              </p>
              <div className="mt-4 text-xs duckling-text">
                <strong>Famous Sagittarians:</strong><br />
                Taylor Swift, Brad Pitt, Britney Spears
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedSign("capricorn")}
              className={`astrology-card ${selectedSign === "capricorn" ? "selected" : ""}`}
            >
              <div className="text-5xl mb-3">♑</div>
              <h4 className="duckling-font font-bold text-xl mb-2">Capricorn</h4>
              <p className="text-sm duckling-text mb-3">Dec 22 - Jan 19</p>
              <p className="text-sm duckling-text">
                Ambitious, disciplined, and responsible
              </p>
              <div className="mt-4 text-xs duckling-text">
                <strong>Famous Capricorns:</strong><br />
                LeBron James, Michelle Obama, Timothée Chalamet
              </div>
            </motion.div>
          </div>

          <div className="text-center">
            <button
              onClick={handleVote}
              disabled={!userName.trim() || !selectedSign}
              className="duckling-button duckling-button-primary"
            >
              Submit Prediction 🔮
            </button>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="success-checkmark mb-4">
            <span className="text-white text-2xl">✓</span>
          </div>
          <h4 className="duckling-font font-bold text-xl mb-4">Thanks for your prediction!</h4>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="duckling-card">
              <div className="text-3xl mb-2">♐</div>
              <p className="duckling-font font-semibold">Sagittarius</p>
              <p className="text-2xl font-bold" style={{ color: "var(--duckling-lavender)" }}>
                {sagittariusVotes} votes
              </p>
            </div>
            <div className="duckling-card">
              <div className="text-3xl mb-2">♑</div>
              <p className="duckling-font font-semibold">Capricorn</p>
              <p className="text-2xl font-bold" style={{ color: "var(--duckling-forest)" }}>
                {capricornVotes} votes
              </p>
            </div>
          </div>

          <p className="duckling-text mt-6">
            You predicted: <strong>{selectedSign === "sagittarius" ? "Sagittarius ♐" : "Capricorn ♑"}</strong>
          </p>
        </motion.div>
      )}
    </div>
  );
}