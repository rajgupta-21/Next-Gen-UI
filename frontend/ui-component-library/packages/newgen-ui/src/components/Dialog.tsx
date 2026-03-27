"use client";
import React from "react";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  theme?: {
    primary?: string;
    primary600?: string;
    accent?: string;
    background?: string;
  };
  className?: string;
}

export default function Dialog({
  open,
  onClose,
  title,
  children,
  theme,
  className = "",
}: DialogProps) {
  if (!open) return null;

  const overlayStyle: React.CSSProperties = {
    background: "rgba(0, 0, 0, 0.4)",
  };

  const dialogStyle: React.CSSProperties = {
    background: theme?.background || "var(--dialog-bg, #ffffff)",
    borderTop: `5px solid ${theme?.primary || "var(--primary, #3b82f6)"}`,
    color: "var(--dialog-text, #111111)",
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={overlayStyle}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow-lg max-w-md p-6 relative ${className}`}
        style={dialogStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-gray-600 hover:text-gray-800 transition-colors"
        >
          ✕
        </button>
        {title && <h2 className="text-xl font-semibold mb-3">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
}
