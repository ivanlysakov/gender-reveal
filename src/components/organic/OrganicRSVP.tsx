"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import OrganicCard from "./OrganicCard";
import OrganicButton from "./OrganicButton";
import { OrganicInput, OrganicTextarea } from "./OrganicInput";
import AnimatedContainer from "../reactbits/AnimatedContainer";

export default function OrganicRSVP() {
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
        <OrganicCard variant="sage" shape="flower" className="max-w-3xl mx-auto text-center">
          <div className="text-8xl mb-8 animate-bounce">
            {formData.attending ? "🌻" : "🌿"}
          </div>
          <h3 className="text-4xl font-bold text-[#36454F] mb-6">
            {formData.attending ? t("thankYouAttending") : t("thankYouNotAttending")}
          </h3>
          <p className="text-xl text-[#654321] mb-8">
            {formData.attending ? t("confirmationAttending") : t("confirmationNotAttending")}
          </p>
          <OrganicButton
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", email: "", attending: null, message: "" });
            }}
            variant="earth"
            shape="pill"
          >
            Update RSVP 🌱
          </OrganicButton>
        </OrganicCard>
      </AnimatedContainer>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-10">
        {/* RSVP Form */}
        <div className="lg:col-span-2">
          <OrganicCard variant="default" shape="leaf">
            <div className="text-center mb-10">
              <div className="text-6xl mb-4">🌸</div>
              <h3 className="text-3xl font-bold text-[#36454F] mb-4">
                {t("formTitle")}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <OrganicInput
                  label={`${t("nameLabel")} 🌿`}
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder={t("namePlaceholder")}
                  icon={formData.name ? "😊" : "🌱"}
                  required
                />

                <OrganicInput
                  label={`${t("emailLabel")} 🌺`}
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  icon={formData.email ? "✉️" : "🍃"}
                  required
                />
              </div>

              <div>
                <label className="block text-[#654321] font-bold text-xl text-center mb-6">
                  {t("willYouJoin")} 🌻
                </label>
                <div className="grid grid-cols-2 gap-6">
                  <button
                    type="button"
                    onClick={() => handleInputChange("attending", true)}
                    className={`
                      organic-card organic-shape p-8 border-3
                      ${formData.attending === true 
                        ? "bg-[#87A96B]/20 border-[#87A96B] scale-105" 
                        : "hover:bg-[#87A96B]/10 hover:border-[#87A96B]/50"}
                      transition-all duration-300
                    `}
                  >
                    <div className="text-6xl mb-4">🌻</div>
                    <div className="text-2xl font-bold text-[#36454F]">
                      {t("yesAttending")}
                    </div>
                    <div className="text-sm text-[#8B8680]">
                      {t("yesSubtitle")}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInputChange("attending", false)}
                    className={`
                      organic-card organic-shape-alt p-8 border-3
                      ${formData.attending === false 
                        ? "bg-[#E8B4B8]/20 border-[#E8B4B8] scale-105" 
                        : "hover:bg-[#E8B4B8]/10 hover:border-[#E8B4B8]/50"}
                      transition-all duration-300
                    `}
                  >
                    <div className="text-6xl mb-4">🍂</div>
                    <div className="text-2xl font-bold text-[#36454F]">
                      {t("noAttending")}
                    </div>
                    <div className="text-sm text-[#8B8680]">
                      {t("noSubtitle")}
                    </div>
                  </button>
                </div>
              </div>

              <OrganicTextarea
                label={`${t("messageLabel")} 🌿`}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder={t("messagePlaceholder")}
                rows={5}
              />

              <OrganicButton
                type="submit"
                disabled={!formData.name.trim() || !formData.email.trim() || formData.attending === null || isSubmitting}
                variant="sage"
                size="lg"
                shape="pill"
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#FFF8E7]/30 border-t-[var(--organic-cream)] rounded-full animate-spin"></div>
                    {t("submitting")}
                  </>
                ) : (
                  <>
                    {t("submitButton")}
                    <span className="text-2xl">🌺</span>
                  </>
                )}
              </OrganicButton>
            </form>
          </OrganicCard>
        </div>

        {/* Event Details */}
        <div className="space-y-8">
          <OrganicCard variant="rose" shape="blob">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#36454F] mb-4">
                Celebration Details
              </h3>
              <div className="text-5xl mb-4">🌸</div>
              
              <div className="space-y-6">
                <div className="p-6 rounded-[20px_40px_20px_40px] bg-[#FAF0E6]">
                  <div className="text-3xl mb-2">📅</div>
                  <div className="font-bold text-xl text-[#654321]">
                    August 7th, 2025
                  </div>
                  <div className="text-[#8B8680]">
                    Summer celebration 🌻
                  </div>
                </div>

                <div className="p-6 rounded-[40px_20px_40px_20px] bg-[#F5DEB3]/30">
                  <div className="text-3xl mb-2">⏰</div>
                  <div className="font-bold text-xl text-[#654321]">
                    3:00 PM
                  </div>
                  <div className="text-[#8B8680]">
                    Afternoon gathering 🌿
                  </div>
                </div>

                <div className="p-6 rounded-[20px_40px_20px_40px] bg-[#87A96B]/10">
                  <div className="text-3xl mb-2">🏡</div>
                  <div className="font-bold text-xl text-[#654321]">
                    Our Garden
                  </div>
                  <div className="text-[#8B8680]">
                    Details in email 🌱
                  </div>
                </div>
              </div>
            </div>
          </OrganicCard>
        </div>
      </div>
    </div>
  );
}