"use client";
import { useState } from "react";

export interface DropdownItem {
  label: string;
  value: string;
  onClick?: () => void;
}

export interface DropdownProps {
  label: string;
  items: DropdownItem[];
  theme?: {
    background?: string;
    text?: string;
    border?: string;
    hover?: string;
  };
  className?: string;
}

export default function Dropdown({
  label,
  items,
  theme,
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const dropdownStyle: React.CSSProperties = {
    background: theme?.background || "var(--dropdown-bg, #ffffff)",
    color: theme?.text || "var(--dropdown-text, #111111)",
    border: `1px solid ${theme?.border || "var(--dropdown-border, #cccccc)"}`,
  };

  const menuStyle: React.CSSProperties = {
    background: theme?.background || "var(--dropdown-bg, #ffffff)",
    border: `1px solid ${theme?.border || "var(--dropdown-border, #cccccc)"}`,
  };

  const itemStyle = (isHover: boolean): React.CSSProperties => ({
    color: theme?.text || "var(--dropdown-text, #111111)",
    background: isHover
      ? theme?.hover || "var(--dropdown-hover, #f0f0f0)"
      : theme?.background || "var(--dropdown-bg, #ffffff)",
  });

  return (
    <div className={`relative inline-block w-48 ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-2 rounded-lg shadow-md transition-colors"
        style={dropdownStyle}
      >
        {label}
        <span className="float-right">▼</span>
      </button>

      {open && (
        <div
          className="absolute left-0 mt-2 w-full rounded-lg shadow-lg z-50"
          style={menuStyle}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="px-4 py-2 cursor-pointer transition-colors"
              style={itemStyle(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  theme?.hover || "var(--dropdown-hover, #f0f0f0)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  theme?.background || "var(--dropdown-bg, #ffffff)";
              }}
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
