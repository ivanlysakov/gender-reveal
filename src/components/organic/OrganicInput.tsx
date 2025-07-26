"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface OrganicInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
}

interface OrganicTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function OrganicInput({ 
  label, 
  icon,
  className = "",
  ...props 
}: OrganicInputProps) {
  return (
    <div className="form-group">
      {label && (
        <label className="block text-[#654321] font-semibold mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`
            organic-input
            w-full
            rounded-[16px_32px_16px_32px]
            ${className}
          `}
          {...props}
        />
        {icon && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl opacity-50">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export function OrganicTextarea({ 
  label,
  className = "",
  ...props 
}: OrganicTextareaProps) {
  return (
    <div className="form-group">
      {label && (
        <label className="block text-[#654321] font-semibold mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`
          organic-input
          w-full
          rounded-[16px_32px_16px_32px]
          min-h-[120px]
          resize-none
          ${className}
        `}
        {...props}
      />
    </div>
  );
}