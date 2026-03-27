"use client";

import React from "react";

function darkenHex(hex: string, amount = 0.18) {
  try {
    const h = hex.replace("#", "");
    const num = parseInt(
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h,
      16,
    );
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
    r = Math.max(0, Math.min(255, Math.floor(r * (1 - amount))));
    g = Math.max(0, Math.min(255, Math.floor(g * (1 - amount))));
    b = Math.max(0, Math.min(255, Math.floor(b * (1 - amount))));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  } catch (e) {
    return hex;
  }
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHsl({ r, g, b }: { r: number; g: number; b: number }) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number) {
  h /= 360;
  s /= 100;
  l /= 100;
  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, h) * 255);
  const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
  return { r, g, b };
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

export default function ThemeSwitcher() {
  const presets = ["#6c5ce7", "#2563eb", "#00d4ff", "#ff7ab6", "#ffb86b"];

  const [mode, setMode] = React.useState<string>(() => {
    if (typeof window === "undefined") return "";
    return (
      localStorage.getItem("newgen:theme") ||
      document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "")
    );
  });

  const getInitialPrimary = () => {
    if (typeof window === "undefined") return "#6c5ce7";
    return (
      localStorage.getItem("newgen:primary") ||
      getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        ?.trim() ||
      "#6c5ce7"
    );
  };

  const [primary, setPrimaryState] = React.useState<string>(getInitialPrimary);
  const [lightness, setLightness] = React.useState<number>(() => {
    const rgb = hexToRgb(getInitialPrimary());
    return rgbToHsl(rgb).l;
  });

  React.useEffect(() => {
    if (mode === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("newgen:theme", "light");
    } else if (mode === "dark") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("newgen:theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("newgen:theme");
    }
  }, [mode]);

  function applyPrimary(hex: string) {
    const h = hex.startsWith("#") ? hex : `#${hex}`;
    const primary600 = darkenHex(h, 0.14);
    document.documentElement.style.setProperty("--primary", h);
    document.documentElement.style.setProperty("--primary-600", primary600);
    // set a simple accent by rotating hue slightly
    try {
      const rgb = hexToRgb(h);
      const hsl = rgbToHsl(rgb);
      const accentH = (hsl.h + 30) % 360;
      const accentRgb = hslToRgb(
        accentH,
        Math.max(20, hsl.s),
        Math.max(30, hsl.l - 6),
      );
      document.documentElement.style.setProperty(
        "--accent",
        rgbToHex(accentRgb),
      );
    } catch (e) {
      // ignore
    }
    localStorage.setItem("newgen:primary", h);
    setPrimaryState(h);
  }

  function onHexChange(value: string) {
    const v = value.trim();
    if (/^#?[0-9a-fA-F]{3}$/.test(v) || /^#?[0-9a-fA-F]{6}$/.test(v)) {
      applyPrimary(v.startsWith("#") ? v : `#${v}`);
      const rgb = hexToRgb(v.startsWith("#") ? v : `#${v}`);
      setLightness(rgbToHsl(rgb).l);
    }
  }

  function onPreset(hex: string) {
    applyPrimary(hex);
    const rgb = hexToRgb(hex);
    setLightness(rgbToHsl(rgb).l);
  }

  function onLightnessChange(val: number) {
    setLightness(val);
    const rgb = hexToRgb(primary);
    const hsl = rgbToHsl(rgb);
    const newRgb = hslToRgb(hsl.h, hsl.s, val);
    const newHex = rgbToHex(newRgb);
    applyPrimary(newHex);
  }

  React.useEffect(() => {
    // apply initial primary on mount
    applyPrimary(primary);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setMode("")}
          className={`px-3 py-1 rounded ${
            mode === "" ? "bg-[var(--primary)] text-white" : "bg-white/6"
          }`}
        >
          System
        </button>
        <button
          onClick={() => setMode("light")}
          className={`px-3 py-1 rounded ${
            mode === "light" ? "bg-[var(--primary)] text-white" : "bg-white/6"
          }`}
        >
          Light
        </button>
        <button
          onClick={() => setMode("dark")}
          className={`px-3 py-1 rounded ${
            mode === "dark" ? "bg-[var(--primary)] text-white" : "bg-white/6"
          }`}
        >
          Dark
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {presets.map((p) => (
            <button
              key={p}
              aria-label={`Set primary ${p}`}
              onClick={() => onPreset(p)}
              className="w-8 h-8 rounded swatch"
              style={{ background: p }}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            aria-label="Primary hex"
            type="text"
            defaultValue={primary}
            onBlur={(e) => onHexChange(e.target.value)}
            className="w-20 px-2 py-1 rounded bg-white/6 border-0 text-sm"
          />
          <input
            aria-label="Primary lightness"
            type="range"
            min={10}
            max={90}
            value={lightness}
            onChange={(e) => onLightnessChange(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
