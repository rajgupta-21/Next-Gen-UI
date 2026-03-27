import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  theme?: {
    primary?: string;
    primary600?: string;
    primaryHover?: string;
  };
};

export default function Button({
  children,
  variant = "solid",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  theme,
  disabled,
  ...rest
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }[size];

  const getButtonStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {};

    if (variant === "solid") {
      baseStyle.backgroundColor = theme?.primary || "var(--primary, #3b82f6)";
      baseStyle.color = "white";
    } else if (variant === "outline") {
      baseStyle.borderColor = theme?.primary || "var(--primary, #3b82f6)";
      baseStyle.color = theme?.primary || "var(--primary, #3b82f6)";
    } else if (variant === "ghost") {
      baseStyle.color = theme?.primary || "var(--primary, #3b82f6)";
    } else if (variant === "gradient") {
      if (theme?.primary && theme?.primary600) {
        baseStyle.background = `linear-gradient(135deg, ${theme.primary}, ${theme.primary600})`;
      } else {
        baseStyle.background =
          "linear-gradient(135deg, var(--primary, #3b82f6), var(--primary-600, #2563eb))";
      }
      baseStyle.color = "white";
    }

    return baseStyle;
  };

  const variantClasses = {
    solid: "border border-transparent hover:opacity-90 active:opacity-100",
    outline: "border-2 bg-transparent hover:bg-opacity-10",
    ghost:
      "border-none bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
    gradient: "border-none hover:opacity-90 active:opacity-100",
  }[variant];

  const buttonClasses = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses}
    ${variantClasses}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <button
      className={buttonClasses}
      style={getButtonStyle()}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : leftIcon ? (
        leftIcon
      ) : null}
      {children}
      {!isLoading && rightIcon && rightIcon}
    </button>
  );
}
