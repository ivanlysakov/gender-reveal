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
    const revealDate = new Date("2024-12-31T15:00:00");

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
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-8">
          {t("title")}
        </h2>
        <div className="flex justify-center gap-6 md:gap-12 flex-wrap">
          {[0, 0, 0, 0].map((_, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[var(--primary-mint)] mb-2">
                00
              </div>
              <div className="text-sm text-[var(--foreground)] opacity-50">...</div>
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
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-2">
          {t("title")}
        </h2>
      </div>

      <div className="flex justify-center gap-8 md:gap-16 flex-wrap mb-8">
        {timeUnits.map((unit, index) => (
          <div key={index} className="text-center">
            {/* Time value */}
            <div className="text-4xl md:text-5xl font-bold text-[var(--primary-mint)] mb-1">
              {String(unit.value).padStart(2, "0")}
            </div>
            {/* Label */}
            <div className="text-sm text-[var(--foreground)] opacity-60 font-medium uppercase tracking-wider">
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="text-center">
        <p className="text-base md:text-lg text-[var(--foreground)] font-medium mb-1">
          {t("revealDate")}
        </p>
        <p className="text-[var(--foreground)] opacity-70 text-sm">{t("revealSubtitle")}</p>
      </div>
    </div>
  );
}
