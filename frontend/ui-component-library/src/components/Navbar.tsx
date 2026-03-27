"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/documentation", label: "Documentation" },
    { href: "/components", label: "Components" },
    { href: "/personalization", label: "Personalization" },
    { href: "/generative-ai", label: "Gen-AI" },
    { href: "/website-builder", label: "Website Builder" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-lg bg-gray-900 dark:bg-gray-100 flex items-center justify-center text-white dark:text-gray-900 font-bold">
              N
            </div>
            <div>
              <div className="font-bold text-lg text-gray-900 dark:text-white">
                NewGen UI
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Component library
              </div>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-2 ml-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  pathname === l.href
                    ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 text-gray-600 dark:text-gray-300 transition-transform ${open ? "rotate-90" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 py-4 space-y-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`block px-4 py-2 rounded-lg transition-all font-medium ${
                  pathname === l.href
                    ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
