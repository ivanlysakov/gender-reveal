"use client";

import React, { useRef } from "react";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function LiquidButton({ 
  children, 
  variant = "primary", 
  className = "",
  onClick,
  ...props 
}: LiquidButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

    if (onClick) onClick(event);
  };

  const baseClass = variant === "primary" ? "liquid-button" : "liquid-button-secondary";

  return (
    <button
      ref={buttonRef}
      className={`${baseClass} ${className} relative overflow-hidden`}
      onClick={createRipple}
      {...props}
    >
      {children}
    </button>
  );
}