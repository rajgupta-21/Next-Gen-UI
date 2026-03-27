"use client";
import React from "react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  theme?: {
    primary?: string;
    primary600?: string;
  };
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  theme,
  className = "",
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const buttonStyle = (isActive: boolean): React.CSSProperties => ({
    backgroundColor: isActive
      ? theme?.primary || "var(--primary, #3b82f6)"
      : "transparent",
    color: isActive ? "white" : "var(--text-color, #374151)",
    border: `1px solid ${theme?.primary || "var(--primary, #3b82f6)"}`,
  });

  const disabledStyle: React.CSSProperties = {
    opacity: 0.5,
    cursor: "not-allowed",
  };

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded transition-colors"
        style={{
          ...buttonStyle(false),
          ...(currentPage === 1 ? disabledStyle : {}),
        }}
      >
        Previous
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className="px-3 py-2 rounded transition-colors"
          style={buttonStyle(page === currentPage)}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded transition-colors"
        style={{
          ...buttonStyle(false),
          ...(currentPage === totalPages ? disabledStyle : {}),
        }}
      >
        Next
      </button>
    </div>
  );
}
