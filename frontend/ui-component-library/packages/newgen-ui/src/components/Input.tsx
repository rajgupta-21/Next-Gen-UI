"use client";
import React, { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  theme?: {
    primary?: string;
    primary600?: string;
    background?: string;
    text?: string;
    border?: string;
  };
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ theme, className = "", ...props }, ref) => {
    const inputStyle: React.CSSProperties = {
      backgroundColor: theme?.background || "var(--input-bg, #ffffff)",
      color: theme?.text || "var(--input-text, #111111)",
      border: `1px solid ${theme?.border || "var(--input-border, #d1d5db)"}`,
    };

    const focusStyle: React.CSSProperties = {
      borderColor: theme?.primary || "var(--primary, #3b82f6)",
      boxShadow: `0 0 0 3px ${
        theme?.primary
          ? `${theme.primary}20`
          : "var(--primary-shadow, rgba(59, 130, 246, 0.1))"
      }`,
    };

    return (
      <input
        ref={ref}
        className={`px-3 py-2 rounded-md transition-all duration-200 focus:outline-none ${className}`}
        style={inputStyle}
        onFocus={(e) => {
          Object.assign(e.target.style, focusStyle);
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = "";
          e.target.style.borderColor =
            theme?.border || "var(--input-border, #d1d5db)";
        }}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
