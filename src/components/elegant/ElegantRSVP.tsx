"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ElegantRSVP() {
  const t = useTranslations("rsvp");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    attending: null as boolean | null,
    guests: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || formData.attending === null) return;
    
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="elegant-card max-w-2xl mx-auto text-center"
      >
        <div className="text-6xl mb-6">✓</div>
        <h3 className="elegant-serif text-3xl mb-4">Thank You!</h3>
        <p className="event-detail-text">
          Your RSVP has been received. We look forward to celebrating with you!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="elegant-card max-w-3xl mx-auto">
      <h3 className="elegant-serif text-3xl text-center mb-2">RSVP</h3>
      <p className="event-detail-text text-center mb-8">
        Kindly respond by July 20th, 2025
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="elegant-label">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="elegant-input"
              required
            />
          </div>
          
          <div>
            <label className="elegant-label">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="elegant-input"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="elegant-label">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="elegant-input"
            />
          </div>
          
          <div>
            <label className="elegant-label">Number of Guests</label>
            <input
              type="number"
              min="1"
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              className="elegant-input"
              placeholder="Including yourself"
            />
          </div>
        </div>

        <div>
          <label className="elegant-label text-center block mb-4">
            Will you be attending?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, attending: true })}
              className={`rsvp-attending-option ${
                formData.attending === true ? "selected-yes" : ""
              }`}
            >
              <div className="text-3xl mb-2">✓</div>
              <div className="elegant-sans font-medium">Joyfully Accept</div>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, attending: false })}
              className={`rsvp-attending-option ${
                formData.attending === false ? "selected-no" : ""
              }`}
            >
              <div className="text-3xl mb-2">✗</div>
              <div className="elegant-sans font-medium">Regretfully Decline</div>
            </button>
          </div>
        </div>

        <div>
          <label className="elegant-label">Special Message (Optional)</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="elegant-input"
            rows={4}
            placeholder="Share your wishes or dietary restrictions..."
          />
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="elegant-button elegant-button-primary px-12"
            disabled={!formData.name || !formData.phone || formData.attending === null}
          >
            Submit RSVP
          </button>
        </div>
      </form>
    </div>
  );
}