"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
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
    const revealDate = new Date("2025-08-09T15:00:00");

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
      <div className="text-center">
        <div className="countdown-timer grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-8">
          {["#FFF3CD", "#E6F3FF", "#FFDFEB", "#F0F8FF"].map((bg, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8"
              style={{
                background: bg,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-1 sm:mb-2 text-[#2C5282]">
                  00
                </div>
                <div className="text-sm md:text-base font-semibold uppercase tracking-wider text-[#2C5282] opacity-80">
                  ...
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
      color: "#2C5282",
      bg: "#FFD93D",
      bgLight: "#FFF3CD",
    },
    {
      value: timeLeft.hours,
      label: t("hours"),
      color: "#2C5282",
      bg: "#87CEEB",
      bgLight: "#E6F3FF",
    },
    {
      value: timeLeft.minutes,
      label: t("minutes"),
      color: "#2C5282",
      bg: "#FFB6C1",
      bgLight: "#FFDFEB",
    },
    {
      value: timeLeft.seconds,
      label: t("seconds"),
      color: "#2C5282",
      bg: "#B6E5F8",
      bgLight: "#F0F8FF",
    },
  ];

  const totalSeconds =
    timeLeft.days * 86400 +
    timeLeft.hours * 3600 +
    timeLeft.minutes * 60 +
    timeLeft.seconds;
  const totalRevealSeconds = 30 * 86400; // 30 days

  return (
    <div className="text-center relative">
      {/* Progress Bar */}

      {/* Countdown Numbers */}
      <div className="countdown-timer grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-8">
        {timeUnits.map((unit, index) => (
          <div key={index} className="relative group">
            {/* Card with gradient background */}
            <div
              className="countdown-timer-item relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              style={{
                background: `linear-gradient(135deg, ${unit.bgLight} 0%, ${unit.bg} 100%)`,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, ${unit.color} 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>

              {/* Number display with better contrast */}
              <div className="relative text-center">
                <div
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-1 sm:mb-2 transition-all duration-300 group-hover:scale-110"
                  style={{
                    color: unit.color,
                    textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontVariantNumeric: "tabular-nums",
                    lineHeight: "1",
                  }}
                >
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div
                  className="text-sm md:text-base font-semibold uppercase tracking-wider"
                  style={{
                    color: unit.color,
                    opacity: 0.8,
                  }}
                >
                  {unit.label}
                </div>
              </div>

              {/* Decorative corner accent */}
              <div
                className="absolute top-0 right-0 w-16 h-16 opacity-20"
                style={{
                  background: unit.bg,
                  clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Countdown Message */}
      <div className="space-y-2 sm:space-y-3 mt-4 sm:mt-8 px-4">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#2C5282]">
          {t("revealDate")}
        </p>
        <p className="text-sm sm:text-base md:text-lg text-[#4A9B9B] font-medium px-2">
          {t("revealSubtitle")}
        </p>
      </div>

      {/* Nature-themed Background Elements */}
      {/* <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent-yellow-light)] to-transparent opacity-30 blur-xl animate-pulse" /> */}
      {/* <div */}
      {/* className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-[var(--primary-mint-light)] to-transparent opacity-30 blur-xl animate-pulse" */}
      {/* style={{ animationDelay: "1s" }} */}
      {/* /> */}
    </div>
  );
}
