"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BabyDuckling from "./BabyDuckling";

interface NameSuggestion {
  id: string;
  name: string;
  suggestedBy: string;
  gender: "boy" | "girl" | "neutral";
  meaning?: string;
  timestamp: Date;
  likes: number;
}

export default function NameSuggestions() {
  const [suggestions, setSuggestions] = useState<NameSuggestion[]>([]);
  const [userName, setUserName] = useState("");
  const [suggestedName, setSuggestedName] = useState("");
  const [nameMeaning, setNameMeaning] = useState("");
  const [selectedGender, setSelectedGender] = useState<"boy" | "girl" | "neutral">("neutral");
  const [likedNames, setLikedNames] = useState<string[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const savedSuggestions = localStorage.getItem("nameSuggestions");
    if (savedSuggestions) {
      setSuggestions(JSON.parse(savedSuggestions));
    }
    
    const savedLikes = localStorage.getItem("likedNames");
    if (savedLikes) {
      setLikedNames(JSON.parse(savedLikes));
    }
  }, []);

  const handleSubmit = () => {
    if (!userName.trim() || !suggestedName.trim()) return;

    const newSuggestion: NameSuggestion = {
      id: Date.now().toString(),
      name: suggestedName,
      suggestedBy: userName,
      gender: selectedGender,
      meaning: nameMeaning.trim() || undefined,
      timestamp: new Date(),
      likes: 0
    };

    const updatedSuggestions = [...suggestions, newSuggestion];
    setSuggestions(updatedSuggestions);
    localStorage.setItem("nameSuggestions", JSON.stringify(updatedSuggestions));

    // Reset form
    setSuggestedName("");
    setNameMeaning("");
    setSelectedGender("neutral");
  };

  const handleLike = (suggestionId: string) => {
    if (likedNames.includes(suggestionId)) {
      // Unlike
      const newLikedNames = likedNames.filter(id => id !== suggestionId);
      setLikedNames(newLikedNames);
      localStorage.setItem("likedNames", JSON.stringify(newLikedNames));
      
      const updatedSuggestions = suggestions.map(s => 
        s.id === suggestionId ? { ...s, likes: s.likes - 1 } : s
      );
      setSuggestions(updatedSuggestions);
      localStorage.setItem("nameSuggestions", JSON.stringify(updatedSuggestions));
    } else {
      // Like
      const newLikedNames = [...likedNames, suggestionId];
      setLikedNames(newLikedNames);
      localStorage.setItem("likedNames", JSON.stringify(newLikedNames));
      
      const updatedSuggestions = suggestions.map(s => 
        s.id === suggestionId ? { ...s, likes: s.likes + 1 } : s
      );
      setSuggestions(updatedSuggestions);
      localStorage.setItem("nameSuggestions", JSON.stringify(updatedSuggestions));
    }
  };

  const getGenderColor = (gender: string) => {
    switch (gender) {
      case "boy": return "#81D4FA";
      case "girl": return "#FFCCBC";
      default: return "#A5D6A7";
    }
  };

  // Sort suggestions by likes
  const sortedSuggestions = [...suggestions].sort((a, b) => b.likes - a.likes);

  return (
    <div className="duckling-card max-w-4xl mx-auto">
      <h3 className="duckling-title text-3xl text-center mb-2">
        Suggest Baby Names! 📝
      </h3>
      <p className="duckling-text text-center mb-8">
        Help us find the perfect name for our little duckling
      </p>

      {/* Name Suggestion Form */}
      <div className="mb-8 p-6 rounded-2xl" style={{ backgroundColor: "#F5FFF5" }}>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="duckling-font font-medium block mb-2">
              Your Name:
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="John Doe"
              className="duckling-input"
            />
          </div>

          <div>
            <label className="duckling-font font-medium block mb-2">
              Suggested Name:
            </label>
            <input
              type="text"
              value={suggestedName}
              onChange={(e) => setSuggestedName(e.target.value)}
              placeholder="Emma, Oliver, etc."
              className="duckling-input"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="duckling-font font-medium block mb-2">
            Name Meaning (Optional):
          </label>
          <input
            type="text"
            value={nameMeaning}
            onChange={(e) => setNameMeaning(e.target.value)}
            placeholder="What does this name mean?"
            className="duckling-input"
          />
        </div>

        <div className="mb-6">
          <label className="duckling-font font-medium block mb-3">
            This name is best for:
          </label>
          <div className="grid grid-cols-3 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedGender("boy")}
              className={`p-3 rounded-xl border-2 transition-all ${
                selectedGender === "boy" 
                  ? "border-blue-400 bg-blue-50" 
                  : "border-gray-200"
              }`}
            >
              <span style={{ color: "#81D4FA" }}>👶 Boy</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedGender("girl")}
              className={`p-3 rounded-xl border-2 transition-all ${
                selectedGender === "girl" 
                  ? "border-pink-400 bg-pink-50" 
                  : "border-gray-200"
              }`}
            >
              <span style={{ color: "#FFCCBC" }}>👶 Girl</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedGender("neutral")}
              className={`p-3 rounded-xl border-2 transition-all ${
                selectedGender === "neutral" 
                  ? "border-green-400 bg-green-50" 
                  : "border-gray-200"
              }`}
            >
              <span style={{ color: "#66BB6A" }}>🌿 Either</span>
            </motion.button>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={!userName.trim() || !suggestedName.trim()}
            className="duckling-button duckling-button-primary"
          >
            Submit Name Suggestion 🦆
          </button>
        </div>
      </div>

      {/* Suggested Names List */}
      {sortedSuggestions.length > 0 && (
        <div>
          <h4 className="duckling-font font-semibold text-xl mb-4">
            All Name Suggestions ({suggestions.length})
          </h4>

          <div className="grid gap-4 max-h-96 overflow-y-auto pr-2">
            {sortedSuggestions.map((suggestion) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="name-suggestion-card"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 
                      className="duckling-font font-bold text-xl"
                      style={{ color: getGenderColor(suggestion.gender) }}
                    >
                      {suggestion.name}
                    </h5>
                    {suggestion.meaning && (
                      <p className="duckling-text text-sm italic">
                        "{suggestion.meaning}"
                      </p>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLike(suggestion.id)}
                    className={`like-button ${
                      likedNames.includes(suggestion.id) ? "liked" : ""
                    }`}
                  >
                    <span className="text-2xl">
                      {likedNames.includes(suggestion.id) ? "❤️" : "🤍"}
                    </span>
                    <span className="ml-1 duckling-font text-sm font-semibold">
                      {suggestion.likes}
                    </span>
                  </motion.button>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <p className="duckling-text text-sm">
                    Suggested by <span className="font-semibold">{suggestion.suggestedBy}</span>
                  </p>
                  <span 
                    className="text-xs font-medium px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: getGenderColor(suggestion.gender) + "20",
                      color: getGenderColor(suggestion.gender)
                    }}
                  >
                    {suggestion.gender === "neutral" ? "Either" : 
                     suggestion.gender === "boy" ? "Boy" : "Girl"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Top 3 Names */}
          {sortedSuggestions.length >= 3 && (
            <div className="mt-8 text-center p-6 rounded-2xl" style={{ backgroundColor: "#FFF9C4" }}>
              <h4 className="duckling-font font-bold text-lg mb-4">
                🏆 Top 3 Most Loved Names
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                {sortedSuggestions.slice(0, 3).map((suggestion, index) => (
                  <div key={suggestion.id} className="text-center">
                    <div className="text-3xl mb-2">
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                    </div>
                    <p 
                      className="duckling-font font-bold text-lg"
                      style={{ color: getGenderColor(suggestion.gender) }}
                    >
                      {suggestion.name}
                    </p>
                    <p className="duckling-text text-sm">
                      {suggestion.likes} likes
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CSS for name suggestion cards */}
      <style jsx>{`
        .name-suggestion-card {
          background: white;
          border: 2px solid #E8F5E9;
          border-radius: 12px;
          padding: 1.25rem;
          transition: all 0.3s ease;
        }

        .name-suggestion-card:hover {
          border-color: #A5D6A7;
          box-shadow: 0 4px 12px rgba(129, 199, 132, 0.15);
        }

        .like-button {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          transition: all 0.3s ease;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .like-button:hover {
          background: #FFE0B2;
        }

        .like-button.liked {
          background: #FFCDD2;
        }
      `}</style>
    </div>
  );
}