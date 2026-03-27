// src/components/Button.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Button({
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
}) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }[size];
  const getButtonStyle = () => {
    const baseStyle = {};
    if (variant === "solid") {
      baseStyle.backgroundColor = (theme == null ? void 0 : theme.primary) || "var(--primary, #3b82f6)";
      baseStyle.color = "white";
    } else if (variant === "outline") {
      baseStyle.borderColor = (theme == null ? void 0 : theme.primary) || "var(--primary, #3b82f6)";
      baseStyle.color = (theme == null ? void 0 : theme.primary) || "var(--primary, #3b82f6)";
    } else if (variant === "ghost") {
      baseStyle.color = (theme == null ? void 0 : theme.primary) || "var(--primary, #3b82f6)";
    } else if (variant === "gradient") {
      if ((theme == null ? void 0 : theme.primary) && (theme == null ? void 0 : theme.primary600)) {
        baseStyle.background = `linear-gradient(135deg, ${theme.primary}, ${theme.primary600})`;
      } else {
        baseStyle.background = "linear-gradient(135deg, var(--primary, #3b82f6), var(--primary-600, #2563eb))";
      }
      baseStyle.color = "white";
    }
    return baseStyle;
  };
  const variantClasses = {
    solid: "border border-transparent hover:opacity-90 active:opacity-100",
    outline: "border-2 bg-transparent hover:bg-opacity-10",
    ghost: "border-none bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
    gradient: "border-none hover:opacity-90 active:opacity-100"
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
  `.trim().replace(/\s+/g, " ");
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: buttonClasses,
      style: getButtonStyle(),
      disabled: disabled || isLoading,
      ...rest,
      children: [
        isLoading ? /* @__PURE__ */ jsxs(
          "svg",
          {
            className: "animate-spin h-4 w-4",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            children: [
              /* @__PURE__ */ jsx(
                "circle",
                {
                  className: "opacity-25",
                  cx: "12",
                  cy: "12",
                  r: "10",
                  stroke: "currentColor",
                  strokeWidth: "4"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  className: "opacity-75",
                  fill: "currentColor",
                  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                }
              )
            ]
          }
        ) : leftIcon ? leftIcon : null,
        children,
        !isLoading && rightIcon && rightIcon
      ]
    }
  );
}

// src/components/Card.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Card({
  title,
  description,
  footer,
  variant = "default",
  className = "",
  children,
  theme,
  style,
  ...rest
}) {
  function hexToRgb(hex) {
    if (!hex)
      return null;
    const h = hex.replace(/^#/, "");
    const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const num = parseInt(full, 16);
    if (Number.isNaN(num))
      return null;
    const r = num >> 16 & 255;
    const g = num >> 8 & 255;
    const b = num & 255;
    return `${r}, ${g}, ${b}`;
  }
  const getCardStyle = () => {
    const baseStyle = { ...style };
    if (theme == null ? void 0 : theme.primary) {
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
      if (variant === "glass") {
        baseStyle.background = "rgba(var(--primary-rgb, 59, 130, 246), 0.05)";
        baseStyle.borderColor = "rgba(var(--primary-rgb, 59, 130, 246), 0.2)";
        baseStyle.backdropFilter = "blur(10px)";
      } else if (variant === "elevated") {
        baseStyle.boxShadow = "0 8px 30px rgba(var(--primary-rgb, 59, 130, 246), 0.12)";
        baseStyle.borderColor = "rgba(var(--primary-rgb, 59, 130, 246), 0.1)";
      } else if (variant === "bordered") {
        baseStyle.borderColor = "var(--primary, #3b82f6)";
      }
    }
    return baseStyle;
  };
  const variantClasses = {
    default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
    bordered: "bg-white dark:bg-gray-800 border-2",
    elevated: "bg-white dark:bg-gray-800 border",
    glass: "backdrop-blur-sm border"
  }[variant];
  const cardClasses = `
    p-6 rounded-2xl
    transition-all duration-200
    ${variantClasses}
    ${className}
  `.trim().replace(/\s+/g, " ");
  return /* @__PURE__ */ jsxs2("div", { className: cardClasses, style: getCardStyle(), ...rest, children: [
    title && /* @__PURE__ */ jsx2("h3", { className: "text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100", children: title }),
    description && /* @__PURE__ */ jsx2("p", { className: "text-sm text-gray-600 dark:text-gray-400 mb-4", children: description }),
    /* @__PURE__ */ jsx2("div", { className: "text-gray-700 dark:text-gray-300", children }),
    footer && /* @__PURE__ */ jsx2("div", { className: "mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400", children: footer })
  ] });
}

// src/components/Carousel.tsx
import { useState } from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function Carousel({
  slides,
  theme,
  className = ""
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const containerStyle = {
    background: (theme == null ? void 0 : theme.background) || "var(--carousel-bg, #f3f3f3)"
  };
  const indicatorStyle = (isActive) => ({
    backgroundColor: isActive ? (theme == null ? void 0 : theme.indicator) || "var(--carousel-indicator, #7C3AED)" : (theme == null ? void 0 : theme.inactiveIndicator) || "var(--carousel-inactive-indicator, #999999)"
  });
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      className: `relative w-full overflow-hidden rounded-xl ${className}`,
      style: containerStyle,
      children: [
        /* @__PURE__ */ jsx3(
          "div",
          {
            className: "flex transition-transform duration-500",
            style: { transform: `translateX(-${currentIndex * 100}%)` },
            children: slides.map((slide, index) => /* @__PURE__ */ jsx3("div", { className: "w-full flex-shrink-0", children: slide }, index))
          }
        ),
        /* @__PURE__ */ jsx3(
          "button",
          {
            onClick: prevSlide,
            className: "absolute top-1/2 left-3 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors",
            children: "\u2039"
          }
        ),
        /* @__PURE__ */ jsx3(
          "button",
          {
            onClick: nextSlide,
            className: "absolute top-1/2 right-3 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors",
            children: "\u203A"
          }
        ),
        /* @__PURE__ */ jsx3("div", { className: "absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2", children: slides.map((_, idx) => /* @__PURE__ */ jsx3(
          "span",
          {
            className: "w-3 h-3 rounded-full cursor-pointer transition-colors",
            onClick: () => setCurrentIndex(idx),
            style: indicatorStyle(idx === currentIndex)
          },
          idx
        )) })
      ]
    }
  );
}

// src/components/Dialog.tsx
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function Dialog({
  open,
  onClose,
  title,
  children,
  theme,
  className = ""
}) {
  if (!open)
    return null;
  const overlayStyle = {
    background: "rgba(0, 0, 0, 0.4)"
  };
  const dialogStyle = {
    background: (theme == null ? void 0 : theme.background) || "var(--dialog-bg, #ffffff)",
    borderTop: `5px solid ${(theme == null ? void 0 : theme.primary) || "var(--primary, #3b82f6)"}`,
    color: "var(--dialog-text, #111111)"
  };
  return /* @__PURE__ */ jsx4(
    "div",
    {
      className: "fixed inset-0 flex items-center justify-center z-50",
      style: overlayStyle,
      onClick: onClose,
      children: /* @__PURE__ */ jsxs4(
        "div",
        {
          className: `bg-white rounded-lg shadow-lg max-w-md p-6 relative ${className}`,
          style: dialogStyle,
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsx4(
              "button",
              {
                onClick: onClose,
                className: "absolute right-4 top-3 text-gray-600 hover:text-gray-800 transition-colors",
                children: "\u2715"
              }
            ),
            title && /* @__PURE__ */ jsx4("h2", { className: "text-xl font-semibold mb-3", children: title }),
            /* @__PURE__ */ jsx4("div", { children })
          ]
        }
      )
    }
  );
}

// src/components/Dropdown.tsx
import { useState as useState2 } from "react";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function Dropdown({
  label,
  items,
  theme,
  className = ""
}) {
  const [open, setOpen] = useState2(false);
  const dropdownStyle = {
    background: (theme == null ? void 0 : theme.background) || "var(--dropdown-bg, #ffffff)",
    color: (theme == null ? void 0 : theme.text) || "var(--dropdown-text, #111111)",
    border: `1px solid ${(theme == null ? void 0 : theme.border) || "var(--dropdown-border, #cccccc)"}`
  };
  const menuStyle = {
    background: (theme == null ? void 0 : theme.background) || "var(--dropdown-bg, #ffffff)",
    border: `1px solid ${(theme == null ? void 0 : theme.border) || "var(--dropdown-border, #cccccc)"}`
  };
  const itemStyle = (isHover) => ({
    color: (theme == null ? void 0 : theme.text) || "var(--dropdown-text, #111111)",
    background: isHover ? (theme == null ? void 0 : theme.hover) || "var(--dropdown-hover, #f0f0f0)" : (theme == null ? void 0 : theme.background) || "var(--dropdown-bg, #ffffff)"
  });
  return /* @__PURE__ */ jsxs5("div", { className: `relative inline-block w-48 ${className}`, children: [
    /* @__PURE__ */ jsxs5(
      "button",
      {
        onClick: () => setOpen(!open),
        className: "w-full text-left px-4 py-2 rounded-lg shadow-md transition-colors",
        style: dropdownStyle,
        children: [
          label,
          /* @__PURE__ */ jsx5("span", { className: "float-right", children: "\u25BC" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsx5(
      "div",
      {
        className: "absolute left-0 mt-2 w-full rounded-lg shadow-lg z-50",
        style: menuStyle,
        children: items.map((item, idx) => /* @__PURE__ */ jsx5(
          "div",
          {
            className: "px-4 py-2 cursor-pointer transition-colors",
            style: itemStyle(false),
            onMouseEnter: (e) => {
              e.currentTarget.style.background = (theme == null ? void 0 : theme.hover) || "var(--dropdown-hover, #f0f0f0)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.background = (theme == null ? void 0 : theme.background) || "var(--dropdown-bg, #ffffff)";
            },
            onClick: () => {
              var _a;
              (_a = item.onClick) == null ? void 0 : _a.call(item);
              setOpen(false);
            },
            children: item.label
          },
          idx
        ))
      }
    )
  ] });
}

// src/components/Input.tsx
import { forwardRef } from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var Input = forwardRef(
  ({ theme, className = "", ...props }, ref) => {
    const inputStyle = {
      backgroundColor: (theme == null ? void 0 : theme.background) || "var(--input-bg, #ffffff)",
      color: (theme == null ? void 0 : theme.text) || "var(--input-text, #111111)",
      border: `1px solid ${(theme == null ? void 0 : theme.border) || "var(--input-border, #d1d5db)"}`
    };
    const focusStyle = {
      borderColor: (theme == null ? void 0 : theme.primary) || "var(--primary, #3b82f6)",
      boxShadow: `0 0 0 3px ${(theme == null ? void 0 : theme.primary) ? `${theme.primary}20` : "var(--primary-shadow, rgba(59, 130, 246, 0.1))"}`
    };
    return /* @__PURE__ */ jsx6(
      "input",
      {
        ref,
        className: `px-3 py-2 rounded-md transition-all duration-200 focus:outline-none ${className}`,
        style: inputStyle,
        onFocus: (e) => {
          Object.assign(e.target.style, focusStyle);
        },
        onBlur: (e) => {
          e.target.style.boxShadow = "";
          e.target.style.borderColor = (theme == null ? void 0 : theme.border) || "var(--input-border, #d1d5db)";
        },
        ...props
      }
    );
  }
);
Input.displayName = "Input";
var Input_default = Input;

// src/components/Navbar.tsx
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
function LibNavbar({
  brand = /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsx7("div", { className: "w-8 h-8 rounded-md bg-[var(--primary)] flex items-center justify-center text-white font-bold", children: "R" }),
    /* @__PURE__ */ jsx7("div", { children: /* @__PURE__ */ jsx7("div", { className: "font-semibold", children: "NewGen UI" }) })
  ] }),
  links = [
    { href: "/", label: "Home" },
    { href: "/documentation", label: "Docs" },
    { href: "/components", label: "Components" }
  ],
  theme,
  className = ""
}) {
  const navStyle = {
    background: (theme == null ? void 0 : theme.primary) && (theme == null ? void 0 : theme.primary600) ? `linear-gradient(90deg, ${theme.primary}, ${theme.primary600})` : "linear-gradient(90deg, var(--primary, #3b82f6), var(--primary-600, #2563eb))"
  };
  return /* @__PURE__ */ jsx7("nav", { className: `w-full py-3 ${className}`, style: navStyle, children: /* @__PURE__ */ jsxs6("div", { className: "container-max px-4 flex items-center justify-between", children: [
    /* @__PURE__ */ jsx7("div", { children: brand }),
    /* @__PURE__ */ jsx7("div", { className: "hidden sm:flex gap-3", children: links.map((l, i) => /* @__PURE__ */ jsx7(
      "a",
      {
        href: l.href || "/",
        className: "nav-link",
        children: /* @__PURE__ */ jsx7(
          "span",
          {
            style: {
              padding: "6px 10px",
              borderRadius: 8,
              transition: "all 160ms",
              color: "white"
            },
            children: l.label
          }
        )
      },
      `${l.href || l.label}-${i}`
    )) })
  ] }) });
}

// src/components/Pagination.tsx
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  theme,
  className = ""
}) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };
  const buttonStyle = (isActive) => ({
    backgroundColor: isActive ? (theme == null ? void 0 : theme.primary) || "var(--primary, #3b82f6)" : "transparent",
    color: isActive ? "white" : "var(--text-color, #374151)",
    border: `1px solid ${(theme == null ? void 0 : theme.primary) || "var(--primary, #3b82f6)"}`
  });
  const disabledStyle = {
    opacity: 0.5,
    cursor: "not-allowed"
  };
  return /* @__PURE__ */ jsxs7("div", { className: `flex items-center justify-center space-x-2 ${className}`, children: [
    /* @__PURE__ */ jsx8(
      "button",
      {
        onClick: () => onPageChange(currentPage - 1),
        disabled: currentPage === 1,
        className: "px-3 py-2 rounded transition-colors",
        style: {
          ...buttonStyle(false),
          ...currentPage === 1 ? disabledStyle : {}
        },
        children: "Previous"
      }
    ),
    getPageNumbers().map((page) => /* @__PURE__ */ jsx8(
      "button",
      {
        onClick: () => onPageChange(page),
        className: "px-3 py-2 rounded transition-colors",
        style: buttonStyle(page === currentPage),
        children: page
      },
      page
    )),
    /* @__PURE__ */ jsx8(
      "button",
      {
        onClick: () => onPageChange(currentPage + 1),
        disabled: currentPage === totalPages,
        className: "px-3 py-2 rounded transition-colors",
        style: {
          ...buttonStyle(false),
          ...currentPage === totalPages ? disabledStyle : {}
        },
        children: "Next"
      }
    )
  ] });
}

// src/components/Progress.tsx
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function Progress({
  value,
  max = 100,
  size = "md",
  variant = "default",
  showLabel = false,
  animated = false,
  className = "",
  theme,
  ...rest
}) {
  const percentage = Math.min(Math.max(value / max * 100, 0), 100);
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  }[size];
  const containerClasses = `relative w-full ${sizeClasses} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${className}`.trim();
  const getBarStyle = () => {
    const baseStyle = {
      width: `${percentage}%`,
      transition: "width 0.3s ease-in-out"
    };
    if (variant === "gradient") {
      if ((theme == null ? void 0 : theme.primary) && (theme == null ? void 0 : theme.primary600)) {
        baseStyle.background = `linear-gradient(90deg, ${theme.primary}, ${theme.primary600})`;
      } else {
        baseStyle.background = "linear-gradient(90deg, var(--primary, #3b82f6), var(--primary-600, #2563eb))";
      }
    } else {
      baseStyle.background = (theme == null ? void 0 : theme.primary) || "var(--primary, #3b82f6)";
    }
    return baseStyle;
  };
  const barClasses = `h-full transition-all duration-300 ease-in-out rounded-full ${variant === "striped" ? "bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:30px_100%]" : ""} ${animated && variant === "striped" ? "animate-pulse" : ""}`.trim();
  return /* @__PURE__ */ jsxs8("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx9("div", { className: containerClasses, ...rest, children: /* @__PURE__ */ jsx9("div", { className: barClasses, style: getBarStyle(), children: variant === "striped" && /* @__PURE__ */ jsx9(
      "div",
      {
        className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent",
        style: {
          backgroundSize: "30px 100%",
          animation: animated ? "progress-stripes 1s linear infinite" : "none"
        }
      }
    ) }) }),
    showLabel && /* @__PURE__ */ jsxs8("div", { className: "mt-1 text-xs text-gray-600 dark:text-gray-400 text-right", children: [
      percentage.toFixed(0),
      "%"
    ] }),
    /* @__PURE__ */ jsx9("style", { children: `
        @keyframes progress-stripes {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 30px 0;
          }
        }
      ` })
  ] });
}

// src/components/Tabs.tsx
import { useState as useState3 } from "react";
import { jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
function Tabs({
  items = [],
  defaultTab,
  variant = "default",
  size = "md",
  onChange,
  className = "",
  theme
}) {
  var _a, _b;
  const [activeTab, setActiveTab] = useState3(defaultTab || ((_a = items[0]) == null ? void 0 : _a.id));
  const handleTabChange = (tabId) => {
    const tab = items.find((item) => item.id === tabId);
    if (tab == null ? void 0 : tab.disabled)
      return;
    setActiveTab(tabId);
    onChange == null ? void 0 : onChange(tabId);
  };
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }[size];
  const getTabStyle = (isActive) => {
    if (variant === "default" && isActive) {
      if ((theme == null ? void 0 : theme.primary) && (theme == null ? void 0 : theme.primary600)) {
        return {
          background: `linear-gradient(90deg, ${theme.primary}, ${theme.primary600})`,
          color: "white"
        };
      }
      return {
        background: "linear-gradient(90deg, var(--primary, #3b82f6), var(--primary-600, #2563eb))",
        color: "white"
      };
    }
    return {};
  };
  const getVariantClasses = (isActive, disabled) => {
    if (disabled)
      return "opacity-50 cursor-not-allowed";
    switch (variant) {
      case "pills":
        return isActive ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";
      case "underline":
        return isActive ? "border-b-2 text-blue-600 dark:text-blue-400" : "border-b-2 border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200";
      default:
        return isActive ? "text-white shadow-md" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";
    }
  };
  const tabListClasses = {
    default: "flex gap-1 bg-gray-50 dark:bg-gray-900 p-1 rounded-lg",
    pills: "flex gap-2",
    underline: "flex gap-4 border-b border-gray-200 dark:border-gray-700"
  }[variant];
  const activeContent = (_b = items.find((item) => item.id === activeTab)) == null ? void 0 : _b.content;
  return /* @__PURE__ */ jsxs9("div", { className: `w-full ${className}`, children: [
    /* @__PURE__ */ jsx10("div", { className: tabListClasses, role: "tablist", children: items.map((item) => /* @__PURE__ */ jsx10(
      "button",
      {
        role: "tab",
        "aria-selected": activeTab === item.id,
        "aria-disabled": item.disabled,
        onClick: () => handleTabChange(item.id),
        disabled: item.disabled,
        className: `${sizeClasses} ${getVariantClasses(
          activeTab === item.id,
          item.disabled
        )} rounded-lg font-medium transition-all duration-200 ${variant === "underline" ? "border-b-2 rounded-none" : ""}`,
        style: getTabStyle(activeTab === item.id),
        children: item.label
      },
      item.id
    )) }),
    /* @__PURE__ */ jsx10("div", { className: "mt-4", role: "tabpanel", children: activeContent })
  ] });
}

// src/components/ThemeProvider.tsx
import { jsx as jsx11 } from "react/jsx-runtime";
function ThemeProvider({
  theme,
  children
}) {
  const style = {};
  if (theme == null ? void 0 : theme.primary)
    style["--primary"] = theme.primary;
  if (theme == null ? void 0 : theme.primary600)
    style["--primary-600"] = theme.primary600;
  if (theme == null ? void 0 : theme.accent)
    style["--accent"] = theme.accent;
  if (theme == null ? void 0 : theme.mode)
    style["--mode"] = theme.mode;
  if (theme == null ? void 0 : theme.primary) {
    const hex = theme.primary.replace(/^#/, "");
    const num = parseInt(
      hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex,
      16
    );
    const r = num >> 16 & 255;
    const g = num >> 8 & 255;
    const b = num & 255;
    style["--primary-rgb"] = `${r}, ${g}, ${b}`;
  }
  if (theme == null ? void 0 : theme.accent) {
    const hex = theme.accent.replace(/^#/, "");
    const num = parseInt(
      hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex,
      16
    );
    const r = num >> 16 & 255;
    const g = num >> 8 & 255;
    const b = num & 255;
    style["--accent-rgb"] = `${r}, ${g}, ${b}`;
  }
  return /* @__PURE__ */ jsx11("div", { style, children });
}
export {
  Button,
  Card,
  Carousel,
  Dialog,
  Dropdown,
  Input_default as Input,
  LibNavbar as Navbar,
  Pagination,
  Progress,
  Tabs,
  ThemeProvider
};
