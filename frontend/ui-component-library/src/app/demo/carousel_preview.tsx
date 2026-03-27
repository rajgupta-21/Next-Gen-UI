"use client";

import { Carousel } from "../../../packages/newgen-ui/src";

export default function Carouselpreview() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
      <Carousel
        slides={[
          <div
            key="1"
            className="h-48 flex items-center justify-center bg-indigo-500 text-white text-2xl font-bold"
          >
            Slide 1
          </div>,
          <div
            key="2"
            className="h-48 flex items-center justify-center bg-purple-500 text-white text-2xl font-bold"
          >
            Slide 2
          </div>,
          <div
            key="3"
            className="h-48 flex items-center justify-center bg-pink-500 text-white text-2xl font-bold"
          >
            Slide 3
          </div>,
        ]}
        theme={{ background: "#f3f4f6", indicator: "#6366f1" }}
        autoPlay
      />
    </div>
  );
}
