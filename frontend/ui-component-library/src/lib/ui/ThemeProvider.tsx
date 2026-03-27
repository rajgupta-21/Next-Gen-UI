import React from "react";

export type ThemeConfig = {
  primary?: string;
  primary600?: string;
  accent?: string;
  mode?: "light" | "dark" | "system";
};

export function ThemeProvider({
  theme,
  children,
}: React.PropsWithChildren<{ theme?: ThemeConfig }>) {
  const style: Record<string, string> = {};
  if (theme?.primary) style["--primary"] = theme.primary;
  if (theme?.primary600) style["--primary-600"] = theme.primary600;
  if (theme?.accent) style["--accent"] = theme.accent;
  if (theme?.mode) style["--mode"] = theme.mode;

  // Also expose RGB tokens to simplify gradients if needed
  if (theme?.primary) {
    const hex = theme.primary.replace(/^#/, "");
    const num = parseInt(hex.length === 3 ? hex.split("").map(c=>c+c).join("") : hex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    style["--primary-rgb"] = `${r}, ${g}, ${b}`;
  }
  if (theme?.accent) {
    const hex = theme.accent.replace(/^#/, "");
    const num = parseInt(hex.length === 3 ? hex.split("").map(c=>c+c).join("") : hex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    style["--accent-rgb"] = `${r}, ${g}, ${b}`;
  }

  return (
    <div style={style as React.CSSProperties}>
      {children}
    </div>
  );
}

export default ThemeProvider;
