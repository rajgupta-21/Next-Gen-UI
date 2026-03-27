import React from "react";

// Card Component
export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "bordered" | "elevated" | "glass";
  theme?: {
    primary?: string;
    primary600?: string;
    accent?: string;
  };
};

export default function Card({
  title,
  description,
  footer,
  variant = "default",
  className = "",
  children,
  theme,
  style,
  ...rest
}: React.PropsWithChildren<CardProps>) {
  function hexToRgb(hex?: string): string | null {
    if (!hex) return null;
    const h = hex.replace(/^#/, "");
    const full =
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h;
    const num = parseInt(full, 16);
    if (Number.isNaN(num)) return null;
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `${r}, ${g}, ${b}`;
  }

  const getCardStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = { ...style };

    // Check if theme prop is provided
    if (theme?.primary) {
      const rgb = hexToRgb(theme.primary);
      if (rgb) {
        if (variant === "glass") {
          baseStyle.background = `rgba(${rgb}, 0.05)`;
          baseStyle.borderColor = `rgba(${rgb}, 0.2)`;
          baseStyle.backdropFilter = "blur(10px)";
        } else if (variant === "elevated") {
          baseStyle.boxShadow = `0 8px 30px rgba(${rgb}, 0.12)`;
          baseStyle.borderColor = `rgba(${rgb}, 0.1)`;
        } else if (variant === "bordered") {
          baseStyle.borderColor = `rgba(${rgb}, 0.3)`;
        }
      }
    } else {
      // Use CSS variables from parent (color picker)
      if (variant === "glass") {
        baseStyle.background = "rgba(var(--primary-rgb, 59, 130, 246), 0.05)";
        baseStyle.borderColor = "rgba(var(--primary-rgb, 59, 130, 246), 0.2)";
        baseStyle.backdropFilter = "blur(10px)";
      } else if (variant === "elevated") {
        baseStyle.boxShadow =
          "0 8px 30px rgba(var(--primary-rgb, 59, 130, 246), 0.12)";
        baseStyle.borderColor = "rgba(var(--primary-rgb, 59, 130, 246), 0.1)";
      } else if (variant === "bordered") {
        baseStyle.borderColor = "var(--primary, #3b82f6)";
      }
    }

    return baseStyle;
  };

  const variantClasses = {
    default:
      "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
    bordered: "bg-white dark:bg-gray-800 border-2",
    elevated: "bg-white dark:bg-gray-800 border",
    glass: "backdrop-blur-sm border",
  }[variant];

  const cardClasses = `
    p-6 rounded-2xl
    transition-all duration-200
    ${variantClasses}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <div className={cardClasses} style={getCardStyle()} {...rest}>
      {title && (
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>
      )}
      <div className="text-gray-700 dark:text-gray-300">{children}</div>
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
          {footer}
        </div>
      )}
    </div>
  );
}
