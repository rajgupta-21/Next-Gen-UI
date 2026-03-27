"use client";

import React from "react";

type Item = { id: string; label: string; href: string };

export default function ComponentsSidebar({ items }: { items: Item[] }) {
  const [active, setActive] = React.useState<string | null>(
    items[0]?.id ?? null,
  );

  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [items]);

  return (
    <aside className="hidden md:block sticky top-20 bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all z-30">
      <div className="">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Components</h2>
        <nav className="flex flex-col gap-2">
          {items.map((it) => (
            <div key={it.id} className="flex items-center justify-between">
              <a
                href={`#${it.id}`}
                className={`px-3 py-2 rounded-lg transition-all text-sm font-medium ${active === it.id ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              >
                {it.label}
              </a>
              <a
                href={it.href}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline ml-2"
                aria-label={`Open preview for ${it.label}`}
              >
                Preview
              </a>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
