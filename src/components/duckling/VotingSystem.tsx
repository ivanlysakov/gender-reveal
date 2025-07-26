"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import BabyDuckling from "./BabyDuckling";

interface Vote {
  id: string;
  name: string;
  prediction: "boy" | "girl";
  timestamp: Date;
}

export default function VotingSystem() {
  const t = useTranslations();
  const [userName, setUserName] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedGender, setSelectedGender] = useState<"boy" | "girl" | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Load votes from localStorage
  useEffect(() => {
    const savedVotes = localStorage.getItem("genderVotes");
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes));
    }
    
    const userVote = localStorage.getItem("userVote");
    if (userVote) {
      setHasVoted(true);
      setShowResults(true);
    }
  }, []);

  const handleVote = () => {
    if (!userName.trim() || !selectedGender) return;

    const newVote: Vote = {
      id: Date.now().toString(),
      name: userName,
      prediction: selectedGender,
      timestamp: new Date()
    };

    const updatedVotes = [...votes, newVote];
    setVotes(updatedVotes);
    localStorage.setItem("genderVotes", JSON.stringify(updatedVotes));
    localStorage.setItem("userVote", JSON.stringify(newVote));
    
    setHasVoted(true);
    setShowResults(true);
  };

  const boyVotes = votes.filter(v => v.prediction === "boy").length;
  const girlVotes = votes.filter(v => v.prediction === "girl").length;
  const totalVotes = votes.length;
  const boyPercentage = totalVotes > 0 ? Math.round((boyVotes / totalVotes) * 100) : 50;
  const girlPercentage = totalVotes > 0 ? Math.round((girlVotes / totalVotes) * 100) : 50;

  if (showResults) {
    return (
      <div className="duckling-card max-w-4xl mx-auto">
        <h3 className="duckling-title text-3xl text-center mb-8">
          {hasVoted ? "Thanks for Voting!" : "Voting Results"} 🎉
        </h3>

        {/* Results Chart */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <BabyDuckling size={50} animate={false} />
              <span className="duckling-font font-semibold text-lg" style={{ color: "#81D4FA" }}>
                Team Boy
              </span>
            </div>
            <span className="duckling-font font-bold text-xl" style={{ color: "#81D4FA" }}>
              {boyPercentage}%
            </span>
          </div>
          <div className="relative h-12 bg-gray-100 rounded-full overflow-hidden mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${boyPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute h-full"
              style={{ background: "linear-gradient(90deg, #81D4FA, #4FC3F7)" }}
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <BabyDuckling size={50} animate={false} />
              <span className="duckling-font font-semibold text-lg" style={{ color: "#FFCCBC" }}>
                Team Girl
              </span>
            </div>
            <span className="duckling-font font-bold text-xl" style={{ color: "#FFCCBC" }}>
              {girlPercentage}%
            </span>
          </div>
          <div className="relative h-12 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${girlPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="absolute h-full"
              style={{ background: "linear-gradient(90deg, #FFCCBC, #FFAB91)" }}
            />
          </div>
        </div>

        <p className="text-center duckling-text mb-6">
          Total votes: {totalVotes}
        </p>

        {/* Recent Voters */}
        <div className="mt-8">
          <h4 className="duckling-font font-semibold text-lg mb-4">Recent Predictions:</h4>
          <div className="max-h-60 overflow-y-auto">
            {votes.slice(-5).reverse().map((vote) => (
              <div key={vote.id} className="guestbook-entry">
                <div className="flex justify-between items-center">
                  <span className="duckling-font font-medium">{vote.name}</span>
                  <span className={`font-semibold ${
                    vote.prediction === "boy" ? "text-blue-500" : "text-pink-500"
                  }`}>
                    {vote.prediction === "boy" ? "👶 Boy" : "👶 Girl"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!hasVoted && (
          <button
            onClick={() => setShowResults(false)}
            className="duckling-button duckling-button-secondary mt-6"
          >
            Back to Vote
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="duckling-card max-w-4xl mx-auto">
      <h3 className="duckling-title text-3xl text-center mb-8">
        What's Your Guess? 🤔
      </h3>

      {/* Name Input */}
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

      {/* Gender Selection */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedGender("boy")}
          className={`vote-card ${selectedGender === "boy" ? "selected" : ""}`}
        >
          <BabyDuckling size={100} emotion="curious" />
          <h4 className="duckling-font font-bold text-2xl mt-4" style={{ color: "#81D4FA" }}>
            It's a Boy! 👶
          </h4>
          <p className="duckling-text mt-2">
            I think it's a little prince!
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedGender("girl")}
          className={`vote-card ${selectedGender === "girl" ? "selected" : ""}`}
        >
          <BabyDuckling size={100} emotion="happy" />
          <h4 className="duckling-font font-bold text-2xl mt-4" style={{ color: "#FFCCBC" }}>
            It's a Girl! 👶
          </h4>
          <p className="duckling-text mt-2">
            I think it's a little princess!
          </p>
        </motion.div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={handleVote}
          disabled={!userName.trim() || !selectedGender}
          className="duckling-button duckling-button-primary"
        >
          Submit My Vote 🗳️
        </button>
        
        <button
          onClick={() => setShowResults(true)}
          className="duckling-button duckling-button-secondary"
        >
          See Results 📊
        </button>
      </div>
    </div>
  );
}