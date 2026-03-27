"use client";
import React, { useState } from "react";

export interface CarouselProps {
  slides: React.ReactNode[];
  theme?: {
    background?: string;
    indicator?: string;
    inactiveIndicator?: string;
  };
  className?: string;
}

export default function Carousel({
  slides,
  theme,
  className = "",
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const containerStyle: React.CSSProperties = {
    background: theme?.background || "var(--carousel-bg, #f3f3f3)",
  };

  const indicatorStyle = (isActive: boolean): React.CSSProperties => ({
    backgroundColor: isActive
      ? theme?.indicator || "var(--carousel-indicator, #7C3AED)"
      : theme?.inactiveIndicator ||
        "var(--carousel-inactive-indicator, #999999)",
  });

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl ${className}`}
      style={containerStyle}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className="w-3 h-3 rounded-full cursor-pointer transition-colors"
            onClick={() => setCurrentIndex(idx)}
            style={indicatorStyle(idx === currentIndex)}
          />
        ))}
      </div>
    </div>
  );
}
