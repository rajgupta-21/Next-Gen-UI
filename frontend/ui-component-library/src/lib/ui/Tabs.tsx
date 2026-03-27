"use client";
import React, { useState } from "react";

export type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  items: TabItem[];
  defaultTab?: string;
  variant?: "default" | "pills" | "underline";
  size?: "sm" | "md" | "lg";
  onChange?: (tabId: string) => void;
  className?: string;
  theme?: {
    primary?: string;
    primary600?: string;
  };
};

export default function Tabs({
  items = [],
  defaultTab,
  variant = "default",
  size = "md",
  onChange,
  className = "",
  theme,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);

  const handleTabChange = (tabId: string) => {
    const tab = items.find((item) => item.id === tabId);
    if (tab?.disabled) return;
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }[size];

  const getTabStyle = (isActive: boolean): React.CSSProperties => {
    if (variant === "default" && isActive) {
      if (theme?.primary && theme?.primary600) {
        return {
          background: `linear-gradient(90deg, ${theme.primary}, ${theme.primary600})`,
          color: "white",
        };
      }
      return {
        background:
          "linear-gradient(90deg, var(--primary, #3b82f6), var(--primary-600, #2563eb))",
        color: "white",
      };
    }
    return {};
  };

  const getVariantClasses = (isActive: boolean, disabled?: boolean) => {
    if (disabled) return "opacity-50 cursor-not-allowed";
    switch (variant) {
      case "pills":
        return isActive
          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";
      case "underline":
        return isActive
          ? "border-b-2 text-blue-600 dark:text-blue-400"
          : "border-b-2 border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200";
      default:
        return isActive
          ? "text-white shadow-md"
          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";
    }
  };

  const tabListClasses = {
    default: "flex gap-1 bg-gray-50 dark:bg-gray-900 p-1 rounded-lg",
    pills: "flex gap-2",
    underline: "flex gap-4 border-b border-gray-200 dark:border-gray-700",
  }[variant];

  const activeContent = items.find((item) => item.id === activeTab)?.content;

  return (
    <div className={`w-full ${className}`}>
      <div className={tabListClasses} role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeTab === item.id}
            aria-disabled={item.disabled}
            onClick={() => handleTabChange(item.id)}
            disabled={item.disabled}
            className={`${sizeClasses} ${getVariantClasses(
              activeTab === item.id,
              item.disabled
            )} rounded-lg font-medium transition-all duration-200 ${
              variant === "underline" ? "border-b-2 rounded-none" : ""
            }`}
            style={getTabStyle(activeTab === item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4" role="tabpanel">
        {activeContent}
      </div>
    </div>
  );
}
