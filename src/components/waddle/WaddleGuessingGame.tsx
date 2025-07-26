"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import WaddleDuck from "./WaddleDuck";

export default function WaddleGuessingGame() {
  const t = useTranslations("guessing");
  const [votes, setVotes] = useState({ boy: 0, girl: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedGender, setSelectedGender] = useState<"boy" | "girl" | null>(null);

  const totalVotes = votes.boy + votes.girl;
  const boyPercentage = totalVotes > 0 ? Math.round((votes.boy / totalVotes) * 100) : 50;
  const girlPercentage = totalVotes > 0 ? Math.round((votes.girl / totalVotes) * 100) : 50;

  const handleVote = (gender: "boy" | "girl") => {
    if (!hasVoted) {
      setVotes(prev => ({
        ...prev,
        [gender]: prev[gender] + 1
      }));
      setSelectedGender(gender);
      setHasVoted(true);
    }
  };

  return (
    <div className="waddle-card max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="script-font text-3xl mb-4" style={{ color: "var(--waddle-blue)" }}>
          What Do You Think?
        </h3>
        <p className="sans-font text-gray-600">
          Cast your vote and see what everyone else thinks!
        </p>
      </div>

      {!hasVoted ? (
        <div className="grid md:grid-cols-2 gap-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleVote("boy")}
            className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 border-3 border-blue-200 hover:border-blue-400 transition-all duration-300"
          >
            <WaddleDuck variant="boy" size={120} animate={false} />
            <h4 className="script-font text-2xl mt-4" style={{ color: "var(--waddle-blue)" }}>
              It's a Boy!
            </h4>
            <p className="sans-font text-gray-600 mt-2">
              I think it's going to be a little prince!
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleVote("girl")}
            className="p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-pink-100 border-3 border-pink-200 hover:border-pink-400 transition-all duration-300"
          >
            <WaddleDuck variant="girl" size={120} animate={false} />
            <h4 className="script-font text-2xl mt-4" style={{ color: "var(--waddle-pink)" }}>
              It's a Girl!
            </h4>
            <p className="sans-font text-gray-600 mt-2">
              I think it's going to be a little princess!
            </p>
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <WaddleDuck variant={selectedGender!} size={150} />
          </motion.div>
          
          <h4 className="script-font text-2xl mb-6" style={{ color: selectedGender === "boy" ? "var(--waddle-blue)" : "var(--waddle-pink)" }}>
            Thanks for voting!
          </h4>

          <div className="max-w-2xl mx-auto">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="sans-font font-semibold" style={{ color: "var(--waddle-blue)" }}>
                  Team Boy
                </span>
                <span className="sans-font font-semibold" style={{ color: "var(--waddle-blue)" }}>
                  {boyPercentage}%
                </span>
              </div>
              <div className="relative h-12 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${boyPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute h-full bg-gradient-to-r from-blue-300 to-blue-400 flex items-center justify-center"
                >
                  {boyPercentage > 20 && (
                    <span className="text-white font-semibold">
                      {votes.boy} {votes.boy === 1 ? "vote" : "votes"}
                    </span>
                  )}
                </motion.div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="sans-font font-semibold" style={{ color: "var(--waddle-pink)" }}>
                  Team Girl
                </span>
                <span className="sans-font font-semibold" style={{ color: "var(--waddle-pink)" }}>
                  {girlPercentage}%
                </span>
              </div>
              <div className="relative h-12 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${girlPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="absolute h-full bg-gradient-to-r from-pink-300 to-pink-400 flex items-center justify-center"
                >
                  {girlPercentage > 20 && (
                    <span className="text-white font-semibold">
                      {votes.girl} {votes.girl === 1 ? "vote" : "votes"}
                    </span>
                  )}
                </motion.div>
              </div>
            </div>

            <p className="sans-font text-gray-600 mt-6">
              Total votes: {totalVotes}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}