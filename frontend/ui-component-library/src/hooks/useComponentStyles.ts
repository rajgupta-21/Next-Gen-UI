// frontend/ui-component-library/src/hooks/useComponentStyles.ts
// Hook to get CSS custom properties for a specific component

import { useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";

/**
 * Returns CSS custom properties string for a component that can be applied
 * via style prop or injected into the DOM.
 */
export function useComponentStyles(componentName: string): React.CSSProperties {
  const { theme } = useTheme();

  return useMemo(() => {
    const settings = theme?.components?.[componentName];
    if (!settings) return {};

    const styles: React.CSSProperties = {};

    // Text size
    if (settings.textSize || settings.fontSize) {
      styles.fontSize = settings.textSize || settings.fontSize;
    }

    // Font weight
    if (settings.fontWeight) {
      styles.fontWeight = Number(settings.fontWeight) || settings.fontWeight;
    }

    // Letter spacing
    if (settings.letterSpacing) {
      styles.letterSpacing = settings.letterSpacing;
    }

    // Border radius
    if (settings.borderRadius) {
      styles.borderRadius = settings.borderRadius;
    }

    // Box shadow
    if (settings.boxShadow && settings.boxShadow !== "none") {
      styles.boxShadow = settings.boxShadow;
    }

    // Padding (can be string "1rem 2rem" or object { x, y })
    if (settings.padding) {
      if (typeof settings.padding === "string") {
        styles.padding = settings.padding;
      } else if (typeof settings.padding === "object") {
        const px = settings.padding.x || "0";
        const py = settings.padding.y || "0";
        styles.padding = `${py} ${px}`;
      }
    }

    // Border width
    if (settings.borderWidth) {
      styles.borderWidth = settings.borderWidth;
    }

    // Transition
    if (settings.transition) {
      const speed = settings.transition.includes("(")
        ? settings.transition
        : `all ${settings.transition} ease-in-out`;
      styles.transition = speed;
    }

    return styles;
  }, [componentName, theme?.components]);
}

/**
 * Returns hover effect CSS for a component
 */
export function getHoverEffectStyle(effect?: string): React.CSSProperties {
  switch (effect) {
    case "scale":
      return { transform: "scale(1.05)" };
    case "lift":
      return { transform: "translateY(-2px)", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" };
    case "opacity":
      return { opacity: 0.8 };
    case "none":
    default:
      return {};
  }
}
