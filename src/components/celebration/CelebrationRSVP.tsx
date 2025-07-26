"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import CelebrationCard from "./CelebrationCard";
import CelebrationButton from "./CelebrationButton";
import BalloonDecoration from "./BalloonDecoration";
import ConfettiEffect from "./ConfettiEffect";
import { motion } from "framer-motion";

export default function CelebrationRSVP() {
  const t = useTranslations("rsvp");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: null as boolean | null,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || formData.attending === null) return;

    setIsSubmitting(true);
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
      <AnimatedContainer animation="scale">
        <CelebrationCard variant="gradient" showConfetti={true} className="max-w-3xl mx-auto text-center">
          <ConfettiEffect trigger={true} duration={5000} />
          <motion.div 
            className="text-8xl mb-8"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {formData.attending ? "🎉" : "💕"}
          </motion.div>
          <h3 className="text-4xl font-bold text-gray-800 mb-6">
            {formData.attending ? t("thankYouAttending") : t("thankYouNotAttending")}
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            {formData.attending ? t("confirmationAttending") : t("confirmationNotAttending")}
          </p>
          <CelebrationButton
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", email: "", attending: null, message: "" });
            }}
            variant="gradient"
            size="lg"
          >
            Update RSVP
          </CelebrationButton>
        </CelebrationCard>
      </AnimatedContainer>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-10">
        {/* RSVP Form */}
        <div className="lg:col-span-2">
          <CelebrationCard variant="default" className="p-8 md:p-10">
            <div className="text-center mb-10">
              <div className="text-6xl mb-4 question-mark-float">🎊</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {t("formTitle")}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {t("nameLabel")} ✨
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={t("namePlaceholder")}
                    className="w-full px-4 py-3 rounded-full border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {t("emailLabel")} 💌
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    className="w-full px-4 py-3 rounded-full border-2 border-blue-200 focus:border-blue-400 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold text-xl text-center mb-6">
                  {t("willYouJoin")} 🎈
                </label>
                <div className="grid grid-cols-2 gap-6">
                  <motion.button
                    type="button"
                    onClick={() => handleInputChange("attending", true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      p-8 rounded-3xl border-3 transition-all duration-300
                      ${formData.attending === true 
                        ? "bg-gradient-to-br from-pink-100 to-pink-200 border-pink-400 shadow-lg scale-105" 
                        : "bg-white hover:bg-pink-50 border-pink-200 hover:border-pink-300"}
                    `}
                  >
                    <div className="text-6xl mb-4">🎉</div>
                    <div className="text-2xl font-bold text-gray-800">
                      {t("yesAttending")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("yesSubtitle")}
                    </div>
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() => handleInputChange("attending", false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      p-8 rounded-3xl border-3 transition-all duration-300
                      ${formData.attending === false 
                        ? "bg-gradient-to-br from-blue-100 to-blue-200 border-blue-400 shadow-lg scale-105" 
                        : "bg-white hover:bg-blue-50 border-blue-200 hover:border-blue-300"}
                    `}
                  >
                    <div className="text-6xl mb-4">💙</div>
                    <div className="text-2xl font-bold text-gray-800">
                      {t("noAttending")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("noSubtitle")}
                    </div>
                  </motion.button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t("messageLabel")} 💝
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder={t("messagePlaceholder")}
                  rows={5}
                  className="w-full px-4 py-3 rounded-3xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              <CelebrationButton
                type="submit"
                disabled={!formData.name.trim() || !formData.email.trim() || formData.attending === null || isSubmitting}
                variant="gradient"
                size="lg"
                className="w-full"
                showSparkle={!isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {t("submitting")}
                  </>
                ) : (
                  <>
                    {t("submitButton")}
                  </>
                )}
              </CelebrationButton>
            </form>
          </CelebrationCard>
        </div>

        {/* Event Details */}
        <div className="space-y-8">
          <CelebrationCard variant="pink" showConfetti={true}>
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Celebration Details
              </h3>
              <BalloonDecoration variant="mixed" size="small" />
              
              <div className="space-y-6 mt-8">
                <div className="celebration-card p-6">
                  <div className="text-3xl mb-2">📅</div>
                  <div className="font-bold text-xl text-gray-800">
                    August 7th, 2025
                  </div>
                  <div className="text-gray-600">
                    Save the date! 🎊
                  </div>
                </div>

                <div className="celebration-card p-6">
                  <div className="text-3xl mb-2">⏰</div>
                  <div className="font-bold text-xl text-gray-800">
                    3:00 PM
                  </div>
                  <div className="text-gray-600">
                    Party time! 🎈
                  </div>
                </div>

                <div className="celebration-card p-6">
                  <div className="text-3xl mb-2">📍</div>
                  <div className="font-bold text-xl text-gray-800">
                    Our Garden
                  </div>
                  <div className="text-gray-600">
                    Details in email 💌
                  </div>
                </div>
              </div>
            </div>
          </CelebrationCard>
        </div>
      </div>
    </div>
  );
}