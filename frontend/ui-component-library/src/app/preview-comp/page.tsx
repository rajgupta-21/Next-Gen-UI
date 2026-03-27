"use client";

import * as PreviewComponents from "@/components/PreviewComp";

export default function PreviewCompPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Component Preview Gallery
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            A comprehensive look at all the preview-style components used by the Website Builder and Generative AI engines.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Hero Section Demo */}
          <div className="md:col-span-2 lg:col-span-3">
            <PreviewComponents.PreviewHero 
              title="Modern UI Components" 
              subtitle="Build faster with our preview-ready components"
            />
          </div>

          {/* Individual Components */}
          <div className="space-y-4">
            <h3 className="font-bold border-b pb-2">Buttons & Inputs</h3>
            <div className="flex gap-4">
              <PreviewComponents.PreviewButton text="Primary" />
              <PreviewComponents.PreviewSecondaryButton text="Secondary" />
            </div>
            <PreviewComponents.PreviewInput label="Email Address" placeholder="hello@example.com" />
          </div>

          <div className="space-y-4">
            <h3 className="font-bold border-b pb-2">Social & Feedback</h3>
            <PreviewComponents.PreviewTestimonial 
              name="Sarah Jenkins" 
              title="UX Designer" 
              content="The component library is incredibly versatile and easy to use."
            />
            <PreviewComponents.PreviewBadge text="Success" color="#10B981" />
          </div>

          <div className="space-y-4">
            <h3 className="font-bold border-b pb-2">Informational</h3>
            <PreviewComponents.PreviewStats value="99.9%" label="Uptime" />
            <PreviewComponents.PreviewQuote text="Design is not just what it looks like." author="Steve Jobs" />
          </div>
        </div>

        <PreviewComponents.PreviewFooter copyright="© 2024 UI Component Library" />
      </div>
    </div>
  );
}
