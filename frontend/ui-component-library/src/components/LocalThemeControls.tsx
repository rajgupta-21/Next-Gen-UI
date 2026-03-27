"use client";

import React from "react";

type Props = {
  onChange?: (vars: Record<string, string>) => void;
  initial?: {
    primary?: string;
    accent?: string;
    mode?: "light" | "dark" | "system";
  };
};

export default function LocalThemeControls({ onChange, initial }: Props) {
  const [primary, setPrimary] = React.useState(initial?.primary || "#6c5ce7");
  const [accent, setAccent] = React.useState(initial?.accent || "#00d4ff");
  const [mode, setMode] = React.useState(initial?.mode || "system");
  // helper: convert hex to HSL
  function hexToHsl(hex: string) {
    const h = hex.replace(/^#/, "");
    const bigint = parseInt(
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h,
      16
    );
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let hOut = 0;
    let sOut = 0;
    const lOut = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      sOut = lOut > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm:
          hOut = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
          break;
        case gNorm:
          hOut = (bNorm - rNorm) / d + 2;
          break;
        case bNorm:
          hOut = (rNorm - gNorm) / d + 4;
          break;
      }
      hOut = hOut * 60;
    }
    return { h: hOut, s: sOut * 100, l: lOut * 100 };
  }

  // helper: convert HSL to hex
  function hslToHex(h: number, s: number, l: number) {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = (x: number) => {
      const v = Math.round(255 * x)
        .toString(16)
        .padStart(2, "0");
      return v;
    };
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
  }

  // helper: slightly darken a hex color
  function darken(hex: string, amount = 0.16) {
    try {
      const h = hex.replace("#", "");
      const num = parseInt(
        h.length === 3
          ? h
              .split("")
              .map((c) => c + c)
              .join("")
          : h,
        16
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

  const [primaryHue, setPrimaryHue] = React.useState<number>(() => {
    // default derived from initial primary
    try {
      const h = hexToHsl(initial?.primary || "#6c5ce7").h;
      return Math.round(h);
    } catch {
      return 260;
    }
  });
  const [accentHue, setAccentHue] = React.useState<number>(() => {
    try {
      const h = hexToHsl(initial?.accent || "#00d4ff").h;
      return Math.round(h);
    } catch {
      return 190;
    }
  });

  const [primarySat, setPrimarySat] = React.useState<number>(() => {
    try {
      return Math.round(hexToHsl(initial?.primary || "#6c5ce7").s);
    } catch {
      return 78;
    }
  });
  const [primaryLight, setPrimaryLight] = React.useState<number>(() => {
    try {
      return Math.round(hexToHsl(initial?.primary || "#6c5ce7").l);
    } catch {
      return 56;
    }
  });

  const [accentSat, setAccentSat] = React.useState<number>(() => {
    try {
      return Math.round(hexToHsl(initial?.accent || "#00d4ff").s);
    } catch {
      return 90;
    }
  });
  const [accentLight, setAccentLight] = React.useState<number>(() => {
    try {
      return Math.round(hexToHsl(initial?.accent || "#00d4ff").l);
    } catch {
      return 52;
    }
  });

  const lastEmitted = React.useRef<string | null>(null);

  React.useEffect(() => {
    // compute a slightly darker primary-600 for gradients
    function darken(hex: string, amount = 0.16) {
      try {
        const h = hex.replace("#", "");
        const num = parseInt(
          h.length === 3
            ? h
                .split("")
                .map((c) => c + c)
                .join("")
            : h,
          16
        );
        let r = (num >> 16) & 0xff;
        let g = (num >> 8) & 0xff;
        let b = num & 0xff;
        r = Math.max(0, Math.min(255, Math.floor(r * (1 - amount))));
        g = Math.max(0, Math.min(255, Math.floor(g * (1 - amount))));
        b = Math.max(0, Math.min(255, Math.floor(b * (1 - amount))));
        return `#${((1 << 24) + (r << 16) + (g << 8) + b)
          .toString(16)
          .slice(1)}`;
      } catch (e) {
        return hex;
      }
    }

    function hexToRgbString(hex: string) {
      const h = hex.replace(/^#/, "");
      const bigint = parseInt(
        h.length === 3
          ? h
              .split("")
              .map((c) => c + c)
              .join("")
          : h,
        16
      );
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r}, ${g}, ${b}`;
    }

    const primary600 = darken(primary, 0.16);
    const primaryRgb = hexToRgbString(primary);
    const accentRgb = hexToRgbString(accent);
    const payload = {
      "--primary": primary,
      "--primary-600": primary600,
      "--accent": accent,
      "--primary-rgb": primaryRgb,
      "--accent-rgb": accentRgb,
      "--mode": mode,
    } as Record<string, string>;

    // avoid spamming onChange if values didn't actually change
    const last = lastEmitted.current;
    const nextStr = JSON.stringify(payload);
    if (nextStr !== last) {
      lastEmitted.current = nextStr;
      onChange?.(payload);
    }
  }, [primary, accent, mode, onChange]);
  React.useEffect(() => {
    // when hue/sat/light changes compute hex and sync
    const hex = hslToHex(primaryHue, primarySat, primaryLight);
    if (hex.toLowerCase() !== primary.toLowerCase()) setPrimary(hex);
    const accentHex = hslToHex(accentHue, accentSat, accentLight);
    if (accentHex.toLowerCase() !== accent.toLowerCase()) setAccent(accentHex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryHue, primarySat, primaryLight, accentHue, accentSat, accentLight]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="block text-sm text-[var(--muted)] mb-2 font-semibold">
          Primary color
        </label>
        <div className="space-y-3">
          <div>
            <input
              aria-label="Primary hue"
              type="range"
              min={0}
              max={360}
              value={primaryHue}
              onChange={(e) => setPrimaryHue(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-[var(--muted)]">
              <span>Hue</span>
              <span>{primaryHue}°</span>
            </div>
          </div>

          <div>
            <input
              aria-label="Primary saturation (contrast)"
              type="range"
              min={0}
              max={100}
              value={primarySat}
              onChange={(e) => setPrimarySat(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-[var(--muted)]">
              <span>Contrast</span>
              <span>{primarySat}%</span>
            </div>
          </div>

          <div>
            <input
              aria-label="Primary lightness (brightness)"
              type="range"
              min={0}
              max={100}
              value={primaryLight}
              onChange={(e) => setPrimaryLight(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-[var(--muted)]">
              <span>Brightness</span>
              <span>{primaryLight}%</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="color"
              value={primary}
              onChange={(e) => {
                setPrimary(e.target.value);
                const hsl = hexToHsl(e.target.value);
                setPrimaryHue(Math.round(hsl.h));
                setPrimarySat(Math.round(hsl.s));
                setPrimaryLight(Math.round(hsl.l));
              }}
              className="w-12 h-12 p-0 border-0 bg-transparent"
            />
            <input
              type="text"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              className="bg-white/5 rounded px-2 py-1 text-sm w-32"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm text-[var(--muted)] mb-2 font-semibold">
          Accent color
        </label>
        <div className="space-y-3">
          <div>
            <input
              aria-label="Accent hue"
              type="range"
              min={0}
              max={360}
              value={accentHue}
              onChange={(e) => setAccentHue(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-[var(--muted)]">
              <span>Hue</span>
              <span>{accentHue}°</span>
            </div>
          </div>

          <div>
            <input
              aria-label="Accent saturation"
              type="range"
              min={0}
              max={100}
              value={accentSat}
              onChange={(e) => setAccentSat(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-[var(--muted)]">
              <span>Contrast</span>
              <span>{accentSat}%</span>
            </div>
          </div>

          <div>
            <input
              aria-label="Accent lightness"
              type="range"
              min={0}
              max={100}
              value={accentLight}
              onChange={(e) => setAccentLight(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-[var(--muted)]">
              <span>Brightness</span>
              <span>{accentLight}%</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="color"
              value={accent}
              onChange={(e) => {
                setAccent(e.target.value);
                const hsl = hexToHsl(e.target.value);
                setAccentHue(Math.round(hsl.h));
                setAccentSat(Math.round(hsl.s));
                setAccentLight(Math.round(hsl.l));
              }}
              className="w-12 h-12 p-0 border-0 bg-transparent"
            />
            <input
              type="text"
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              className="bg-white/5 rounded px-2 py-1 text-sm w-32"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setMode("system")}
          className={`px-3 py-1 rounded ${
            mode === "system" ? "bg-[var(--primary)] text-white" : "bg-white/6"
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
    </div>
  );
}
