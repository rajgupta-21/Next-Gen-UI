// frontend/ui-component-library/src/hooks/useUserTheme.ts
// React hook to manage user theme from backend

import type { ThemeConfig } from "@rajgupta2509/next-gen-builder";
import { useEffect, useState } from "react";

interface UserTheme extends ThemeConfig {
  id: string;
  name: string;
  components?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

interface UseUserThemeOptions {
  userId: string;
  backendUrl?: string;
  autoApply?: boolean;
}

export function useUserTheme({
  userId,
  backendUrl = "http://localhost:5004",
  autoApply = true,
}: UseUserThemeOptions) {
  const [theme, setTheme] = useState<UserTheme | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user theme from backend
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backendUrl}/api/themes/${userId}`);

        if (!res.ok) {
          // If user doesn't have a theme yet (404), create a default one
          if (res.status === 404) {
            console.log("Creating default theme for new user...");
            const createRes = await fetch(
              `${backendUrl}/api/themes/${userId}`,
              {
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
                  },
                  typography: {
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    baseFontSize: 16,
                    lineHeight: 1.5,
                  },
                }),
              },
            );

            if (!createRes.ok) {
              throw new Error(
                `Failed to create default theme: ${createRes.statusText}`,
              );
            }

            const data = await createRes.json();
            setTheme(data);
            setError(null);

            if (autoApply && data?.colors) {
              applyThemeToDom(data);
            }
          } else {
            throw new Error(`Failed to fetch theme: ${res.statusText}`);
          }
        } else {
          const data = await res.json();
          setTheme(data);
          setError(null);

          // Auto-apply CSS variables if enabled
          if (autoApply && data?.colors) {
            applyThemeToDom(data);
          }
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Failed to fetch theme:", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTheme();
    }
  }, [userId, backendUrl, autoApply]);

  // Apply theme colors and typography to DOM
  const applyThemeToDom = (themeData: UserTheme) => {
    const root = document.documentElement;

    // Apply colors
    if (themeData.colors) {
      Object.entries(themeData.colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, String(value));
      });
    }

    // Apply typography
    if (themeData.typography) {
      if (themeData.typography.fontFamily) {
        root.style.setProperty(
          "--font-family",
          themeData.typography.fontFamily,
        );
      }
      if (themeData.typography.baseFontSize) {
        root.style.setProperty(
          "--base-font-size",
          `${themeData.typography.baseFontSize}px`,
        );
      }
      if (themeData.typography.lineHeight) {
        root.style.setProperty(
          "--line-height",
          String(themeData.typography.lineHeight),
        );
      }
    }
  };

  // Update user theme
  const updateTheme = async (updates: Partial<UserTheme>): Promise<boolean> => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/themes/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...theme, ...updates }),
      });

      if (!res.ok) {
        throw new Error(`Failed to update theme: ${res.statusText}`);
      }

      const data = await res.json();
      setTheme(data.theme);
      applyThemeToDom(data.theme);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Customize a specific component
  const customizeComponent = async (
    componentName: string,
    settings: Record<string, any>,
  ): Promise<boolean> => {
    try {
      const res = await fetch(
        `${backendUrl}/api/components/${userId}/${componentName}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(settings),
        },
      );

      if (!res.ok) {
        throw new Error(`Failed to customize component: ${res.statusText}`);
      }

      // Refresh theme
      const themeRes = await fetch(`${backendUrl}/api/themes/${userId}`);
      const themeData = await themeRes.json();
      setTheme(themeData);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      return false;
    }
  };

  // Apply a preset theme
  const applyPreset = async (presetId: string): Promise<boolean> => {
    try {
      setLoading(true);
      const res = await fetch(
        `${backendUrl}/api/presets/${userId}/${presetId}`,
        {
          method: "POST",
        },
      );

      if (!res.ok) {
        throw new Error(`Failed to apply preset: ${res.statusText}`);
      }

      const data = await res.json();
      setTheme(data.theme);
      applyThemeToDom(data.theme);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get available presets
  const getPresets = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/presets`);
      if (!res.ok) {
        throw new Error(`Failed to fetch presets: ${res.statusText}`);
      }
      return await res.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      return [];
    }
  };

  return {
    theme,
    loading,
    error,
    updateTheme,
    customizeComponent,
    applyPreset,
    getPresets,
    applyThemeToDom,
  };
}

export type { UserTheme };
