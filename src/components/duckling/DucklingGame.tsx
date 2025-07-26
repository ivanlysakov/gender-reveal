"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BabyDuckling from "./BabyDuckling";

interface GameScore {
  playerName: string;
  score: number;
  timestamp: Date;
}

export default function DucklingGame() {
  const [gameState, setGameState] = useState<"start" | "playing" | "finished">("start");
  const [playerName, setPlayerName] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [duckPosition, setDuckPosition] = useState({ x: 50, y: 50 });
  const [highScores, setHighScores] = useState<GameScore[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Load high scores
  useEffect(() => {
    const saved = localStorage.getItem("ducklingGameScores");
    if (saved) {
      setHighScores(JSON.parse(saved));
    }
  }, []);

  // Game timer
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      endGame();
    }
  }, [gameState, timeLeft]);

  // Move duck randomly
  useEffect(() => {
    if (gameState === "playing") {
      const interval = setInterval(() => {
        setDuckPosition({
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  const startGame = () => {
    if (!playerName.trim()) return;
    setGameState("playing");
    setScore(0);
    setTimeLeft(30);
  };

  const catchDuck = () => {
    setScore(score + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 500);
    
    // Immediately move duck to new position
    setDuckPosition({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10
    });
  };

  const endGame = () => {
    setGameState("finished");
    
    const newScore: GameScore = {
      playerName,
      score,
      timestamp: new Date()
    };
    
    const updatedScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    setHighScores(updatedScores);
    localStorage.setItem("ducklingGameScores", JSON.stringify(updatedScores));
  };

  const resetGame = () => {
    setGameState("start");
    setScore(0);
    setTimeLeft(30);
  };

  return (
    <div className="duckling-card max-w-4xl mx-auto">
      <h3 className="duckling-title text-3xl text-center mb-2">
        Catch the Duckling! 🦆
      </h3>
      <p className="duckling-text text-center mb-6">
        How many ducklings can you catch before time runs out?
      </p>

      {/* Start Screen */}
      {gameState === "start" && (
        <div className="text-center">
          <BabyDuckling size={150} emotion="excited" />
          
          <div className="mt-6 mb-6 max-w-sm mx-auto">
            <label className="duckling-font font-medium block mb-2">
              Your Name:
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name..."
              className="duckling-input"
            />
          </div>

          <button
            onClick={startGame}
            disabled={!playerName.trim()}
            className="duckling-button duckling-button-primary"
          >
            Start Game! 🎮
          </button>

          {/* High Scores Preview */}
          {highScores.length > 0 && (
            <div className="mt-8">
              <h4 className="duckling-font font-semibold mb-3">
                🏆 Top Score: {highScores[0].playerName} - {highScores[0].score} ducks
              </h4>
            </div>
          )}
        </div>
      )}

      {/* Game Screen */}
      {gameState === "playing" && (
        <div>
          {/* Game Stats */}
          <div className="game-stats">
            <div className="stat-box">
              <span className="duckling-font font-semibold">Score:</span>
              <span className="text-2xl font-bold ml-2">{score}</span>
            </div>
            <div className="stat-box">
              <span className="duckling-font font-semibold">Time:</span>
              <span className={`text-2xl font-bold ml-2 ${timeLeft <= 10 ? "text-red-500" : ""}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Game Area */}
          <div className="game-area">
            <motion.div
              animate={{
                left: `${duckPosition.x}%`,
                top: `${duckPosition.y}%`
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              onClick={catchDuck}
              className="duckling-target"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <BabyDuckling size={60} emotion="happy" animate={false} />
            </motion.div>

            {/* Confetti Effect */}
            <AnimatePresence>
              {showConfetti && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="confetti"
                  style={{
                    left: `${duckPosition.x}%`,
                    top: `${duckPosition.y}%`
                  }}
                >
                  <span className="text-4xl">✨</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Encouraging Messages */}
          <div className="text-center mt-4">
            <motion.p
              key={score}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="duckling-font font-semibold text-lg"
              style={{ color: "#66BB6A" }}
            >
              {score === 0 ? "Click the duckling!" :
               score < 5 ? "Good start!" :
               score < 10 ? "You're doing great!" :
               score < 15 ? "Amazing!" :
               "You're a duck-catching master!"}
            </motion.p>
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === "finished" && (
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <BabyDuckling 
              size={120} 
              emotion={score > 10 ? "excited" : "happy"} 
            />
          </motion.div>

          <h4 className="duckling-font font-bold text-2xl mt-6 mb-2">
            Game Over!
          </h4>
          
          <div className="score-display">
            <p className="duckling-font text-lg mb-1">You caught</p>
            <p className="text-5xl font-bold" style={{ color: "#66BB6A" }}>
              {score}
            </p>
            <p className="duckling-font text-lg">ducklings!</p>
          </div>

          {/* Check if new high score */}
          {highScores[0]?.playerName === playerName && highScores[0]?.score === score && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="new-record"
            >
              🎉 NEW HIGH SCORE! 🎉
            </motion.div>
          )}

          <button
            onClick={resetGame}
            className="duckling-button duckling-button-primary mt-6"
          >
            Play Again 🔄
          </button>

          {/* High Scores Table */}
          <div className="high-scores mt-8">
            <h4 className="duckling-font font-semibold text-xl mb-4">
              🏆 High Scores
            </h4>
            <div className="scores-list">
              {highScores.map((scoreEntry, index) => (
                <div
                  key={index}
                  className={`score-entry ${
                    scoreEntry.playerName === playerName && 
                    scoreEntry.score === score ? "highlight" : ""
                  }`}
                >
                  <span className="rank">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}.`}
                  </span>
                  <span className="player-name">{scoreEntry.playerName}</span>
                  <span className="player-score">{scoreEntry.score} ducks</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CSS */}
      <style jsx>{`
        .game-stats {
          display: flex;
          justify-content: space-around;
          margin-bottom: 1.5rem;
        }

        .stat-box {
          background: #F5FFF5;
          padding: 1rem 2rem;
          border-radius: 12px;
          border: 2px solid #E8F5E9;
        }

        .game-area {
          position: relative;
          height: 400px;
          background: linear-gradient(135deg, #F5FFF5 0%, #E8F5E9 100%);
          border-radius: 20px;
          border: 3px solid #C8E6C9;
          overflow: hidden;
          cursor: crosshair;
        }

        .duckling-target {
          position: absolute;
          transform: translate(-50%, -50%);
          cursor: pointer;
          z-index: 10;
        }

        .confetti {
          position: absolute;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 20;
        }

        .score-display {
          margin: 2rem 0;
          padding: 1.5rem;
          background: #F5FFF5;
          border-radius: 16px;
          border: 2px solid #E8F5E9;
        }

        .new-record {
          font-size: 1.25rem;
          font-weight: bold;
          color: #66BB6A;
          margin: 1rem 0;
          animation: pulse 1s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .high-scores {
          max-width: 400px;
          margin: 0 auto;
        }

        .scores-list {
          background: white;
          border: 2px solid #E8F5E9;
          border-radius: 12px;
          padding: 1rem;
        }

        .score-entry {
          display: flex;
          align-items: center;
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 0.5rem;
          transition: all 0.3s ease;
        }

        .score-entry:last-child {
          margin-bottom: 0;
        }

        .score-entry.highlight {
          background: #FFF59D;
          box-shadow: 0 2px 8px rgba(255, 235, 59, 0.3);
        }

        .rank {
          font-weight: bold;
          width: 40px;
        }

        .player-name {
          flex: 1;
          font-weight: 500;
        }

        .player-score {
          font-weight: bold;
          color: #66BB6A;
        }
      `}</style>
    </div>
  );
}