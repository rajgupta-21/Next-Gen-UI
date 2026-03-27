"use client";

import React from "react";

export default function MobileComponentsDrawer({ items }: { items: { id: string; label: string; href: string }[] }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        className="md:hidden p-2 rounded-md"
        aria-label="Open components drawer"
        onClick={() => setOpen(true)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 bg-[var(--surface)] border-r border-white/6 p-4 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Components</h3>
              <button aria-label="Close" onClick={() => setOpen(false)} className="p-1">
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {items.map((it) => (
                <a key={it.id} href={it.href} className="nav-link" onClick={() => setOpen(false)}>
                  {it.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex-1" onClick={() => setOpen(false)}>
            <div className="w-full h-full bg-black/40" />
          </div>
        </div>
      )}
    </>
  );
}
