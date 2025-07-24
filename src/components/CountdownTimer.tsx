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
      <div className="text-center py-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-12">
          {t("title")} ✨
        </h2>
        <div className="flex justify-center gap-6 flex-wrap">
          {[0, 0, 0, 0].map((_, index) => (
            <div key={index} className="text-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-blue-400/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 min-w-[120px] md:min-w-[140px] transform hover:scale-105 transition-all duration-500">
                  <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-3">
                    00
                  </div>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-pink-300 to-blue-300 mx-auto rounded-full"></div>
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
      color: "from-rose-500 to-pink-500",
      bgColor: "from-rose-400/20 to-pink-400/20",
    },
    {
      value: timeLeft.hours,
      label: t("hours"),
      color: "from-purple-500 to-violet-500",
      bgColor: "from-purple-400/20 to-violet-400/20",
    },
    {
      value: timeLeft.minutes,
      label: t("minutes"),
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-400/20 to-cyan-400/20",
    },
    {
      value: timeLeft.seconds,
      label: t("seconds"),
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-400/20 to-teal-400/20",
    },
  ];

  return (
    <div className="text-center py-12">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          {t("title")}
        </h2>
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="text-3xl animate-bounce">🎯</div>
          <div className="text-3xl animate-bounce delay-200">⏰</div>
          <div className="text-3xl animate-bounce delay-400">✨</div>
        </div>
      </div>

      <div className="flex justify-center gap-4 md:gap-8 flex-wrap mb-12">
        {timeUnits.map((unit, index) => (
          <div key={index} className="text-center group">
            <div className="relative">
              {/* Animated background glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${unit.bgColor} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 scale-110`}
              ></div>

              {/* Main container */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/40 min-w-[110px] md:min-w-[140px] transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 group-hover:shadow-3xl">
                {/* Time value */}
                <div
                  className={`text-5xl md:text-6xl font-black bg-gradient-to-br ${unit.color} bg-clip-text text-transparent mb-4 leading-none`}
                >
                  {String(unit.value).padStart(2, "0")}
                </div>

                {/* Separator line */}
                <div
                  className={`w-12 h-1 bg-gradient-to-r ${unit.color} mx-auto rounded-full mb-3 opacity-60`}
                ></div>

                {/* Label */}
                <div className="text-sm md:text-base text-gray-700 font-semibold tracking-wide uppercase">
                  {unit.label}
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced call to action */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-300/20 via-purple-300/20 to-blue-300/20 rounded-2xl blur-xl"></div>
        <div className="relative bg-white/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/30 max-w-2xl mx-auto">
          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="text-2xl animate-bounce">📅</span>
            <span className="text-2xl animate-bounce delay-300">🎊</span>
            <span className="text-2xl animate-bounce delay-600">💫</span>
          </div>
          <p className="text-lg md:text-xl text-gray-700 font-medium mb-2">
            {t("revealDate")}
          </p>
          <p className="text-gray-600">{t("revealSubtitle")}</p>
        </div>
      </div>
    </div>
  );
}
