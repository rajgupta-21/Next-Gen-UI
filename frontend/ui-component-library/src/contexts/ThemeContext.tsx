// frontend/ui-component-library/src/contexts/ThemeContext.tsx
// Global theme state that persists across pages

"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface ComponentSettings {
  textSize?: string;
  fontWeight?: string | number;
  letterSpacing?: string;
  borderRadius?: string;
  padding?: { x?: string; y?: string } | string;
  boxShadow?: string;
  hoverEffect?: string;
  transition?: string;
  borderWidth?: string;
  focusShadow?: string;
  [key: string]: any;
}

export interface ThemeColors {
  primary: string;
  primary600?: string;
  secondary?: string;
  accent: string;
  background: string;
  surface?: string;
  text: string;
  border: string;
  error?: string;
  success?: string;
  warning?: string;
}

export interface ThemeTypography {
  fontFamily: string;
  baseFontSize: number;
  lineHeight: number;
  fontWeight?: {
    light?: number;
    normal?: number;
    semibold?: number;
    bold?: number;
  };
}

export interface UserTheme {
  id: string;
  name: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  components?: Record<string, ComponentSettings>;
}

interface ThemeContextValue {
  theme: UserTheme | null;
  loading: boolean;
  error: string | null;
  userId: string;
  updateTheme: (updates: Partial<UserTheme>) => Promise<boolean>;
  customizeComponent: (componentName: string, settings: ComponentSettings) => Promise<boolean>;
  applyPreset: (presetId: string) => Promise<boolean>;
  getPresets: () => Promise<any[]>;
  refreshTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5004";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string>("default-user");
  const [theme, setTheme] = useState<UserTheme | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize userId from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("userId");
    if (!stored) {
      const newId = `user-${Date.now()}`;
      localStorage.setItem("userId", newId);
      setUserId(newId);
    } else {
      setUserId(stored);
    }
  }, []);

  // Apply theme colors to DOM CSS variables
  const applyThemeToDom = useCallback((themeData: UserTheme) => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;

    if (themeData.colors) {
      Object.entries(themeData.colors).forEach(([key, value]) => {
        if (value) root.style.setProperty(`--${key}`, String(value));
      });
    }

    if (themeData.typography) {
      if (themeData.typography.fontFamily) {
        root.style.setProperty("--font-family", themeData.typography.fontFamily);
      }
      if (themeData.typography.baseFontSize) {
        root.style.setProperty("--base-font-size", `${themeData.typography.baseFontSize}px`);
      }
      if (themeData.typography.lineHeight) {
        root.style.setProperty("--line-height", String(themeData.typography.lineHeight));
      }
    }
  }, []);

  // Fetch theme from backend
  const fetchTheme = useCallback(async () => {
    if (!userId || userId === "default-user") return;

    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/themes/${userId}`);

      if (!res.ok) {
        if (res.status === 404) {
          // Create default theme
          const createRes = await fetch(`${BACKEND_URL}/api/themes/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: "Default Theme",
              colors: {
                primary: "#3B82F6",
                secondary: "#8B5CF6",
                accent: "#EC4899",
                background: "#FFFFFF",
                surface: "#F3F4F6",
                error: "#EF4444",
                success: "#10B981",
                warning: "#F59E0B",
                text: "#111111",
                border: "#E5E7EB",
              },
              typography: {
                fontFamily: "system-ui, -apple-system, sans-serif",
                baseFontSize: 16,
                lineHeight: 1.5,
              },
            }),
          });

          if (createRes.ok) {
            const data = await createRes.json();
            setTheme(data.theme);
            applyThemeToDom(data.theme);
          }
        }
        setError(null);
      } else {
        const data = await res.json();
        setTheme(data);
        applyThemeToDom(data);
        setError(null);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      console.error("Failed to fetch theme:", msg);
    } finally {
      setLoading(false);
    }
  }, [userId, applyThemeToDom]);

  // Fetch theme when userId is available
  useEffect(() => {
    if (userId && userId !== "default-user") {
      fetchTheme();
    }
  }, [userId, fetchTheme]);

  // Update theme
  const updateTheme = useCallback(async (updates: Partial<UserTheme>): Promise<boolean> => {
    if (!theme) return false;

    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/themes/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...theme, ...updates }),
      });

      if (!res.ok) throw new Error(`Failed to update theme: ${res.statusText}`);

      const data = await res.json();
      setTheme(data.theme);
      applyThemeToDom(data.theme);
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [theme, userId, applyThemeToDom]);

  // Customize component
  const customizeComponent = useCallback(async (
    componentName: string,
    settings: ComponentSettings
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/components/${userId}/${componentName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error(`Failed to customize component: ${res.statusText}`);

      // Refresh theme to get updated component settings
      await fetchTheme();
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      return false;
    }
  }, [userId, fetchTheme]);

  // Apply preset
  const applyPreset = useCallback(async (presetId: string): Promise<boolean> => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/presets/${userId}/${presetId}`, {
        method: "POST",
      });

      if (!res.ok) throw new Error(`Failed to apply preset: ${res.statusText}`);

      const data = await res.json();
      setTheme(data.theme);
      applyThemeToDom(data.theme);
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [userId, applyThemeToDom]);

  // Get presets
  const getPresets = useCallback(async (): Promise<any[]> => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/presets`);
      if (!res.ok) throw new Error("Failed to fetch presets");
      return await res.json();
    } catch (err) {
      console.error("Failed to fetch presets:", err);
      return [];
    }
  }, []);

  // Refresh theme
  const refreshTheme = useCallback(async () => {
    await fetchTheme();
  }, [fetchTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        loading,
        error,
        userId,
        updateTheme,
        customizeComponent,
        applyPreset,
        getPresets,
        refreshTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
