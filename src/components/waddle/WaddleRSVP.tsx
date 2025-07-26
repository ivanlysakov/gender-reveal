"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function WaddleRSVP() {
  const t = useTranslations("rsvp");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    attending: null as boolean | null,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="waddle-card max-w-2xl mx-auto text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 1 }}
          className="text-6xl mb-6"
        >
          🎉
        </motion.div>
        <h3 className="script-font text-4xl mb-4" style={{ color: "var(--waddle-pink)" }}>
          Thank You!
        </h3>
        <p className="sans-font text-lg text-gray-600 mb-6">
          {formData.attending 
            ? "We can't wait to celebrate with you!"
            : "We'll miss you at the celebration!"}
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", phone: "", email: "", attending: null, message: "" });
          }}
          className="waddle-button waddle-button-primary"
        >
          Submit Another RSVP
        </button>
      </motion.div>
    );
  }

  return (
    <div className="waddle-card max-w-4xl mx-auto">
      <h3 className="script-font text-3xl text-center mb-2" style={{ color: "var(--waddle-pink)" }}>
        RSVP
      </h3>
      <p className="sans-font text-center text-gray-600 mb-8">
        Please let us know if you can join us for this special day!
      </p>

      <form onSubmit={handleSubmit} className="waddle-form">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="waddle-label">
              Your Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your name"
              className="waddle-input"
              required
            />
          </div>

          <div>
            <label className="waddle-label">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="(123) 456-7890"
              className="waddle-input"
              required
            />
          </div>
        </div>

        <div>
          <label className="waddle-label">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="your@email.com"
            className="waddle-input"
          />
        </div>

        <div>
          <label className="waddle-label text-center block mb-4">
            Will you be attending?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              type="button"
              onClick={() => handleInputChange("attending", true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-6 rounded-2xl border-3 transition-all duration-300
                ${formData.attending === true 
                  ? "bg-gradient-to-br from-pink-100 to-blue-100 border-pink-300" 
                  : "bg-white hover:bg-gray-50 border-gray-200"}
              `}
            >
              <div className="text-4xl mb-2">🎊</div>
              <div className="font-semibold">Yes, I'll be there!</div>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => handleInputChange("attending", false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-6 rounded-2xl border-3 transition-all duration-300
                ${formData.attending === false 
                  ? "bg-gradient-to-br from-gray-100 to-gray-200 border-gray-400" 
                  : "bg-white hover:bg-gray-50 border-gray-200"}
              `}
            >
              <div className="text-4xl mb-2">😢</div>
              <div className="font-semibold">Sorry, can't make it</div>
            </motion.button>
          </div>
        </div>

        <div>
          <label className="waddle-label">
            Message (Optional)
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            placeholder="Share your excitement or well wishes..."
            className="waddle-input waddle-textarea"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={!formData.name.trim() || !formData.phone.trim() || isSubmitting}
            className="waddle-button waddle-button-primary min-w-[200px]"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Submitting...
              </span>
            ) : (
              "RSVP Now"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}