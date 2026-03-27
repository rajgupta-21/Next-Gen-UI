"use client";

import ComponentSection from "../../components/ComponentSection";
import ComponentsSidebar from "../../components/ComponentsSidebar";
import MobileComponentsDrawer from "../../components/MobileComponentsDrawer";

import { components } from "@/const/page";
import Buttonpreview from "../demo/Button_preview";
import Cardpreview from "../demo/Card_preview";
import Carouselpreview from "../demo/carousel_preview";
import Dialogpreiew from "../demo/dialog_preiew";
import Dropdownpreview from "../demo/dropdown_preview";
import Inputpreview from "../demo/input_preview";
import Navbarpreview from "../demo/Navbar_preview";
import Paginationpreview from "../demo/pagination_preview";
import Progresspreview from "../demo/progress_preview";
import Tabspreview from "../demo/tabs_preview";

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-6 pt-20">
            <ComponentsSidebar items={components} />
          </div>
        </div>

        <main className="space-y-12">
          {/* Mobile header */}
          <div className="lg:hidden mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Components
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Premium UI components for your next project.
              </p>
            </div>
            <MobileComponentsDrawer items={components} />
          </div>

          {/* Desktop header */}
          <div className="hidden lg:block mb-10">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
              Components
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
              Explore our library of production-ready components. Copy the code or customize them to match your brand perfectly.
            </p>
          </div>

          <div className="space-y-16">
            <ComponentSection id="button" label="Button">
              <Buttonpreview />
            </ComponentSection>

            <ComponentSection id="card" label="Card">
              <Cardpreview />
            </ComponentSection>

            <ComponentSection id="navbar" label="Navbar">
              <Navbarpreview />
            </ComponentSection>

            <ComponentSection id="dialog" label="Dialog">
              <Dialogpreiew />
            </ComponentSection>

            <ComponentSection id="carousel" label="Carousel">
              <Carouselpreview />
            </ComponentSection>

            <ComponentSection id="dropdown" label="Dropdown">
              <Dropdownpreview />
            </ComponentSection>

            <ComponentSection id="tabs" label="Tabs">
              <Tabspreview />
            </ComponentSection>

            <ComponentSection id="progress" label="Progress">
              <Progresspreview />
            </ComponentSection>

            <ComponentSection id="pagination" label="Pagination">
              <Paginationpreview />
            </ComponentSection>

            <ComponentSection id="input" label="Input">
              <Inputpreview />
            </ComponentSection>
          </div>
        </main>
      </div>
    </div>
  );
}
