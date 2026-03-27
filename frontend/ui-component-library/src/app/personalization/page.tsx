"use client";

import ComponentPersonalizationPanel from "@/personalisationcomp/tabs";

export default function PersonalizationPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            My Components
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
            Pick any component, adjust its color and style, then copy the ready-to-use code for React, HTML, or Angular.
          </p>
        </div>

        {/* Panel */}
        <ComponentPersonalizationPanel />
      </div>
    </div>
  );
}
