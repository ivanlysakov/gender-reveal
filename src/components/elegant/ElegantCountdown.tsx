"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ElegantCountdown() {
  const t = useTranslations("countdown");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Set your reveal date here
    const revealDate = new Date("2025-08-07T15:00:00");

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = revealDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center gap-8">
          {[0, 0, 0, 0].map((_, index) => (
            <div key={index} className="text-center">
              <div className="elegant-card px-8 py-6 min-w-[100px]">
                <div className="elegant-serif text-4xl" style={{ color: "var(--elegant-gray)" }}>
                  00
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const timeUnits = [
    {
      value: timeLeft.days,
      label: t("days"),
    },
    {
      value: timeLeft.hours,
      label: t("hours"),
    },
    {
      value: timeLeft.minutes,
      label: t("minutes"),
    },
    {
      value: timeLeft.seconds,
      label: t("seconds"),
    },
  ];

  return (
    <div className="text-center">
      <div className="flex justify-center gap-4 md:gap-8 flex-wrap mb-8">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative group">
              {/* Subtle background accent */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: index % 2 === 0 
                    ? "linear-gradient(135deg, rgba(165, 196, 231, 0.1), transparent)"
                    : "linear-gradient(135deg, rgba(244, 179, 194, 0.1), transparent)"
                }}
              />
              
              {/* Time container */}
              <div className="relative bg-white border border-gray-200 rounded-lg px-6 py-4 min-w-[90px] md:min-w-[110px] hover:border-gray-300 transition-all duration-300">
                {/* Time value */}
                <div 
                  className="elegant-serif text-4xl md:text-5xl mb-2"
                  style={{ 
                    color: index % 2 === 0 ? "var(--elegant-blue)" : "var(--elegant-pink)" 
                  }}
                >
                  {String(unit.value).padStart(2, "0")}
                </div>

                {/* Separator */}
                <div 
                  className="w-8 h-px mx-auto mb-2"
                  style={{ 
                    backgroundColor: index % 2 === 0 ? "var(--elegant-blue)" : "var(--elegant-pink)",
                    opacity: 0.3
                  }}
                />

                {/* Label */}
                <div className="elegant-sans text-xs uppercase tracking-wider" style={{ color: "var(--elegant-light-gray)" }}>
                  {unit.label}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reveal date info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-lg mx-auto"
      >
        <p className="event-detail-text">
          {t("revealDate")}
        </p>
        <p className="elegant-script text-2xl mt-2" style={{ color: "var(--elegant-pink)" }}>
          Save the Date!
        </p>
      </motion.div>
    </div>
  );
}