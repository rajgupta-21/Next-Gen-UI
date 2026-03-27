"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type ComponentName =
  | "button"
  | "card"
  | "navbar"
  | "dialog"
  | "carousel"
  | "dropdown"
  | "tabs"
  | "progress"
  | "pagination"
  | "input";

export const ALL_COMPONENTS: ComponentName[] = [
  "button",
  "card",
  "navbar",
  "dialog",
  "carousel",
  "dropdown",
  "tabs",
  "progress",
  "pagination",
  "input",
];

export interface ComponentCustomization {
  primaryColor: string;
  textColor: string;
  borderRadius: string;
  label: string;
  // Typography
  fontSize: string;
  fontWeight: string;
  letterSpacing: string;
  // Spacing
  padding: string;
  // Effects
  shadow: string;
  opacity: string;
  // Border
  borderWidth: string;
  borderStyle: string;
}

export const COMPONENT_DEFAULTS: Record<ComponentName, ComponentCustomization> =
  {
    button: {
      primaryColor: "#374151",
      textColor: "#ffffff",
      borderRadius: "0.5rem",
      label: "Click Me",
      fontSize: "0.875rem",
      fontWeight: "600",
      letterSpacing: "normal",
      padding: "0.5rem 1.25rem",
      shadow: "none",
      opacity: "1",
      borderWidth: "1px",
      borderStyle: "solid",
    },
    card: {
      primaryColor: "#374151",
      textColor: "#111827",
      borderRadius: "1rem",
      label: "Card Title",
      fontSize: "0.875rem",
      fontWeight: "400",
      letterSpacing: "normal",
      padding: "1.5rem",
      shadow: "0 1px 3px rgba(0,0,0,0.1)",
      opacity: "1",
      borderWidth: "1px",
      borderStyle: "solid",
    },
    navbar: {
      primaryColor: "#374151",
      textColor: "#ffffff",
      borderRadius: "0",
      label: "NewGen UI",
      fontSize: "0.875rem",
      fontWeight: "600",
      letterSpacing: "normal",
      padding: "1rem 1.5rem",
      shadow: "0 1px 3px rgba(0,0,0,0.1)",
      opacity: "1",
      borderWidth: "1px",
      borderStyle: "solid",
    },
    dialog: {
      primaryColor: "#374151",
      textColor: "#111827",
      borderRadius: "0.75rem",
      label: "Dialog Title",
      fontSize: "0.875rem",
      fontWeight: "600",
      letterSpacing: "normal",
      padding: "1.5rem",
      shadow: "0 20px 60px rgba(0,0,0,0.3)",
      opacity: "1",
      borderWidth: "1px",
      borderStyle: "solid",
    },
    carousel: {
      primaryColor: "#374151",
      textColor: "#ffffff",
      borderRadius: "0.75rem",
      label: "Slide",
      fontSize: "1rem",
      fontWeight: "700",
      letterSpacing: "normal",
      padding: "0",
      shadow: "none",
      opacity: "1",
      borderWidth: "0",
      borderStyle: "solid",
    },
    dropdown: {
      primaryColor: "#374151",
      textColor: "#111111",
      borderRadius: "0.5rem",
      label: "Select option",
      fontSize: "0.875rem",
      fontWeight: "400",
      letterSpacing: "normal",
      padding: "0.5rem 0.75rem",
      shadow: "0 4px 12px rgba(0,0,0,0.1)",
      opacity: "1",
      borderWidth: "1px",
      borderStyle: "solid",
    },
    tabs: {
      primaryColor: "#374151",
      textColor: "#ffffff",
      borderRadius: "0.5rem",
      label: "Tab",
      fontSize: "0.875rem",
      fontWeight: "600",
      letterSpacing: "normal",
      padding: "0.5rem 1rem",
      shadow: "none",
      opacity: "1",
      borderWidth: "1px",
      borderStyle: "solid",
    },
    progress: {
      primaryColor: "#374151",
      textColor: "#111827",
      borderRadius: "9999px",
      label: "Loading...",
      fontSize: "0.75rem",
      fontWeight: "500",
      letterSpacing: "normal",
      padding: "0",
      shadow: "none",
      opacity: "1",
      borderWidth: "0",
      borderStyle: "solid",
    },
    pagination: {
      primaryColor: "#374151",
      textColor: "#ffffff",
      borderRadius: "0.375rem",
      label: "Page",
      fontSize: "0.875rem",
      fontWeight: "500",
      letterSpacing: "normal",
      padding: "0.375rem 0.75rem",
      shadow: "none",
      opacity: "1",
      borderWidth: "1px",
      borderStyle: "solid",
    },
    input: {
      primaryColor: "#374151",
      textColor: "#111827",
      borderRadius: "0.5rem",
      label: "Enter text...",
      fontSize: "0.875rem",
      fontWeight: "400",
      letterSpacing: "normal",
      padding: "0.5rem 0.75rem",
      shadow: "none",
      opacity: "1",
      borderWidth: "1px",
      borderStyle: "solid",
    },
  };

interface ComponentCustomContextValue {
  customizations: Record<string, ComponentCustomization>;
  getCustomization: (component: ComponentName) => ComponentCustomization;
  setCustomization: (
    component: ComponentName,
    settings: Partial<ComponentCustomization>
  ) => void;
  resetCustomization: (component: ComponentName) => void;
}

const ComponentCustomContext =
  createContext<ComponentCustomContextValue | null>(null);

const STORAGE_KEY = "newgen:component-custom";

/** Darken a hex color by `amount` (0–1). */
export function darkenHex(hex: string, amount = 0.15): string {
  try {
    const h = hex.replace(/^#/, "");
    const full =
      h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const num = parseInt(full, 16);
    const r = Math.max(0, Math.floor(((num >> 16) & 255) * (1 - amount)));
    const g = Math.max(0, Math.floor(((num >> 8) & 255) * (1 - amount)));
    const b = Math.max(0, Math.floor((num & 255) * (1 - amount)));
    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
  } catch {
    return hex;
  }
}

/** Convert hex to "r, g, b" string for rgba() usage. */
export function hexToRgbStr(hex: string): string {
  try {
    const h = hex.replace(/^#/, "");
    const full =
      h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const num = parseInt(full, 16);
    return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
  } catch {
    return "59, 130, 246";
  }
}

/** CSS custom property override — makes every component inside respond to the chosen color. */
export function buildVarStyle(primaryColor: string): React.CSSProperties {
  return {
    ["--primary" as string]: primaryColor,
    ["--primary-600" as string]: darkenHex(primaryColor),
    ["--primary-rgb" as string]: hexToRgbStr(primaryColor),
  };
}

export function ComponentCustomProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [customizations, setCustomizations] = useState<
    Record<string, ComponentCustomization>
  >({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCustomizations(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customizations));
  }, [customizations, hydrated]);

  const getCustomization = useCallback(
    (component: ComponentName): ComponentCustomization => ({
      ...COMPONENT_DEFAULTS[component],
      ...customizations[component],
    }),
    [customizations]
  );

  const setCustomization = useCallback(
    (component: ComponentName, settings: Partial<ComponentCustomization>) => {
      setCustomizations((prev) => ({
        ...prev,
        [component]: {
          ...COMPONENT_DEFAULTS[component],
          ...prev[component],
          ...settings,
        },
      }));
    },
    []
  );

  const resetCustomization = useCallback((component: ComponentName) => {
    setCustomizations((prev) => {
      const next = { ...prev };
      delete next[component];
      return next;
    });
  }, []);

  return (
    <ComponentCustomContext.Provider
      value={{
        customizations,
        getCustomization,
        setCustomization,
        resetCustomization,
      }}
    >
      {children}
    </ComponentCustomContext.Provider>
  );
}

export function useComponentCustom(): ComponentCustomContextValue {
  const ctx = useContext(ComponentCustomContext);
  if (!ctx)
    throw new Error(
      "useComponentCustom must be used within ComponentCustomProvider"
    );
  return ctx;
}
