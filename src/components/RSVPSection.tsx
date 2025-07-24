"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function RSVPSection() {
  const t = useTranslations("rsvp");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: null as boolean | null,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock RSVP stats - will be replaced with Convex data
  const [rsvpStats] = useState({
    attending: 15,
    notAttending: 3,
    total: 18,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      formData.attending === null
    )
      return;

    setIsSubmitting(true);

    // TODO: Replace with actual Convex mutation
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
      <div className="text-center">
        <div className="relative group max-w-3xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-cyan-400/20 rounded-3xl blur-3xl group-hover:blur-[4rem] transition-all duration-700"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/40">
            <div className="text-8xl mb-8 animate-bounce">
              {formData.attending ? "🎉" : "💙"}
            </div>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
              {formData.attending ? "We&apos;re so excited!" : "We understand!"}
            </h3>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-700 mb-4">
                {formData.attending
                  ? "Thank you for confirming your attendance! We can&apos;t wait to celebrate with you!"
                  : "We&apos;ll miss you, but we understand. We&apos;ll share photos and updates with you!"}
              </p>
              <div className="flex items-center justify-center gap-3 text-2xl">
                {formData.attending ? (
                  <>
                    <span>🎊</span>
                    <span>👨‍👩‍👧‍👦</span>
                    <span>🥳</span>
                  </>
                ) : (
                  <>
                    <span>💕</span>
                    <span>📸</span>
                    <span>💌</span>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  attending: null,
                  message: "",
                });
              }}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Update RSVP ✨
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Enhanced RSVP Form */}
        <div className="lg:col-span-2 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-cyan-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/40">
            <div className="text-center mb-10">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                {t("formTitle")}
              </h3>
              <div className="flex justify-center gap-2 mb-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse delay-200"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-400"></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="rsvp-name"
                    className="block text-gray-800 font-bold text-lg mb-3"
                  >
                    {t("nameLabel")} ✨
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="rsvp-name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="glass-input w-full text-lg"
                      placeholder="Enter your full name"
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">
                      {formData.name ? "😊" : "👋"}
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="rsvp-email"
                    className="block text-gray-800 font-bold text-lg mb-3"
                  >
                    {t("emailLabel")} 📧
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="rsvp-email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="glass-input w-full text-lg"
                      placeholder="your.email@example.com"
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">
                      {formData.email ? "✉️" : "📮"}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-800 font-bold text-xl text-center mb-6">
                  {t("willYouJoin")} 🎊
                </label>
                <div className="grid grid-cols-2 gap-6">
                  <button
                    type="button"
                    onClick={() => handleInputChange("attending", true)}
                    className={`group relative p-8 rounded-3xl border-3 transition-all duration-500 transform hover:scale-105 ${
                      formData.attending === true
                        ? "border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-2xl scale-105 -translate-y-2"
                        : "border-gray-200 hover:border-emerald-300 hover:bg-gradient-to-br hover:from-emerald-50/50 hover:to-teal-50/50 hover:shadow-xl"
                    }`}
                  >
                    <div className="text-6xl mb-4 group-hover:animate-bounce">
                      🎉
                    </div>
                    <div className="text-2xl font-black text-emerald-600 mb-2">
                      {t("yesAttending")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("yesSubtitle")}
                    </div>
                    {formData.attending === true && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-ping"></div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInputChange("attending", false)}
                    className={`group relative p-8 rounded-3xl border-3 transition-all duration-500 transform hover:scale-105 ${
                      formData.attending === false
                        ? "border-rose-400 bg-gradient-to-br from-rose-50 to-pink-50 shadow-2xl scale-105 -translate-y-2"
                        : "border-gray-200 hover:border-rose-300 hover:bg-gradient-to-br hover:from-rose-50/50 hover:to-pink-50/50 hover:shadow-xl"
                    }`}
                  >
                    <div className="text-6xl mb-4 group-hover:animate-bounce">
                      💙
                    </div>
                    <div className="text-2xl font-black text-rose-600 mb-2">
                      {t("noAttending")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("noSubtitle")}
                    </div>
                    {formData.attending === false && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full animate-ping"></div>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="rsvp-message"
                  className="block text-gray-800 font-bold text-lg mb-3"
                >
                  {t("messageLabel")} 💭
                </label>
                <textarea
                  id="rsvp-message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={5}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm resize-none"
                  placeholder="Share your excitement, dietary requirements, or any special messages..."
                />
              </div>

              <button
                type="submit"
                disabled={
                  !formData.name.trim() ||
                  !formData.email.trim() ||
                  formData.attending === null ||
                  isSubmitting
                }
                className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white py-5 rounded-2xl font-bold text-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none transform hover:-translate-y-1 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {t("submitting")}
                    </>
                  ) : (
                    <>
                      {t("submitButton")}
                      <span className="text-2xl">✅</span>
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Enhanced Stats and Details */}
        <div className="space-y-8">
          {/* Enhanced RSVP Stats */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-rose-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  Response Summary
                </h3>
                <div className="text-5xl mb-4">📊</div>
              </div>

              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
                  <div className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {rsvpStats.total}
                  </div>
                  <div className="text-gray-700 font-semibold text-lg">
                    Total Responses
                  </div>
                  <div className="text-2xl mt-2">🎯</div>
                </div>

                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-l-4 border-emerald-400">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-4xl">🎉</span>
                        <div>
                          <div className="font-black text-xl text-emerald-700">
                            Attending
                          </div>
                          <div className="text-sm text-emerald-600">
                            Ready to celebrate!
                          </div>
                        </div>
                      </div>
                      <div className="text-4xl font-black text-emerald-600">
                        {rsvpStats.attending}
                      </div>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 p-6 border-l-4 border-rose-400">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-4xl">💙</span>
                        <div>
                          <div className="font-black text-xl text-rose-700">
                            Can&apos;t Make It
                          </div>
                          <div className="text-sm text-rose-600">
                            Will be missed
                          </div>
                        </div>
                      </div>
                      <div className="text-4xl font-black text-rose-600">
                        {rsvpStats.notAttending}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 text-center">
                  <div className="flex justify-center gap-2 text-2xl mb-2">
                    <span className="animate-pulse">⏰</span>
                    <span className="animate-pulse delay-300">📈</span>
                    <span className="animate-pulse delay-600">✨</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    Updated in real-time
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Party Details */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-red-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
                  Celebration Details
                </h3>
                <div className="text-5xl mb-4">🎊</div>
              </div>

              <div className="space-y-6">
                <div className="group p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl group-hover:animate-bounce">
                      📅
                    </span>
                    <div>
                      <div className="font-black text-xl text-amber-700">
                        December 31, 2024
                      </div>
                      <div className="text-amber-600">
                        New Year&apos;s Eve Surprise!
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-400 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl group-hover:animate-bounce">
                      ⏰
                    </span>
                    <div>
                      <div className="font-black text-xl text-purple-700">
                        3:00 PM
                      </div>
                      <div className="text-purple-600">
                        Don&apos;t be late for the big moment!
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-400 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl group-hover:animate-bounce">
                      🏡
                    </span>
                    <div>
                      <div className="font-black text-xl text-emerald-700">
                        Our Family Home
                      </div>
                      <div className="text-emerald-600">
                        Address details sent via email
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <div className="text-4xl mb-2">💕</div>
                <p className="text-gray-700 font-medium">
                  Can&apos;t wait to celebrate with you all!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
