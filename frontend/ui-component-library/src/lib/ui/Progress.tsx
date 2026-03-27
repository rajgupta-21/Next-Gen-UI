import React from "react";

export type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "gradient" | "striped";
  showLabel?: boolean;
  animated?: boolean;
  theme?: {
    primary?: string;
    primary600?: string;
    background?: string;
  };
};

export default function Progress({
  value,
  max = 100,
  size = "md",
  variant = "default",
  showLabel = false,
  animated = false,
  className = "",
  theme,
  ...rest
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  }[size];

  const containerClasses =
    `relative w-full ${sizeClasses} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${className}`.trim();

  const getBarStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      width: `${percentage}%`,
      transition: "width 0.3s ease-in-out",
    };

    if (variant === "gradient") {
      if (theme?.primary && theme?.primary600) {
        baseStyle.background = `linear-gradient(90deg, ${theme.primary}, ${theme.primary600})`;
      } else {
        baseStyle.background =
          "linear-gradient(90deg, var(--primary, #3b82f6), var(--primary-600, #2563eb))";
      }
    } else {
      baseStyle.background = theme?.primary || "var(--primary, #3b82f6)";
    }

    return baseStyle;
  };

  const barClasses =
    `h-full transition-all duration-300 ease-in-out rounded-full ${
      variant === "striped"
        ? "bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:30px_100%]"
        : ""
    } ${animated && variant === "striped" ? "animate-pulse" : ""}`.trim();

  return (
    <div className="w-full">
      <div className={containerClasses} {...rest}>
        <div className={barClasses} style={getBarStyle()}>
          {variant === "striped" && (
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              style={{
                backgroundSize: "30px 100%",
                animation: animated
                  ? "progress-stripes 1s linear infinite"
                  : "none",
              }}
            />
          )}
        </div>
      </div>
      {showLabel && (
        <div className="mt-1 text-xs text-gray-600 dark:text-gray-400 text-right">
          {percentage.toFixed(0)}%
        </div>
      )}
      <style>{`
        @keyframes progress-stripes {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 30px 0;
          }
        }
      `}</style>
    </div>
  );
}
