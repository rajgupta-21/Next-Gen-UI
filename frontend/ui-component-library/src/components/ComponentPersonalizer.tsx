// frontend/ui-component-library/src/components/ComponentPersonalizer.tsx
// Advanced component customization for sizes, text, spacing, and effects

"use client";
import { useState } from "react";

import { useTheme } from "@/contexts/ThemeContext";
import Button from "@/lib/ui/Button";
import Card from "@/lib/ui/Card";
import Carousel from "@/lib/ui/Carousel";
import Dropdown from "@/lib/ui/Dropdown";
import Input from "@/lib/ui/Input";
import LibNavbar from "@/lib/ui/Navbar";
import Pagination from "@/lib/ui/Pagination";
import Progress from "@/lib/ui/Progress";
import Tabs from "@/lib/ui/Tabs";

interface ComponentPersonalizerProps {
  userId: string;
  onCustomizationChange?: (customizations: any) => void;
}

export default function ComponentPersonalizer({
  userId,
  onCustomizationChange,
}: ComponentPersonalizerProps) {
  const { customizeComponent, theme, loading, error } = useTheme();

  const [activeComponent, setActiveComponent] = useState<string>("button");
  const [customizing, setCustomizing] = useState(false);
  const [livePreview, setLivePreview] = useState<any>({});
  const [savedConfigurations, setSavedConfigurations] = useState<any>({});

  // Component customization options
  const componentConfigs: Record<string, any> = {
    button: {
      name: "Button",
      description: "Customize button appearance and behavior",
      options: [
        {
          id: "textSize",
          label: "Text Size",
          type: "select",
          values: ["0.75rem", "0.875rem", "1rem", "1.125rem", "1.25rem"],
          default: "1rem",
          preview: true,
        },
        {
          id: "fontWeight",
          label: "Font Weight",
          type: "select",
          values: ["300", "400", "500", "600", "700", "800", "900"],
          default: "600",
          preview: true,
        },
        {
          id: "letterSpacing",
          label: "Letter Spacing",
          type: "select",
          values: ["normal", "0.05em", "0.1em", "0.15em"],
          default: "normal",
          preview: true,
        },
        {
          id: "borderRadius",
          label: "Border Radius",
          type: "select",
          values: ["0rem", "0.375rem", "0.5rem", "0.75rem", "1rem"],
          default: "0.5rem",
          preview: true,
        },
        {
          id: "padding",
          label: "Padding",
          type: "object",
          fields: {
            x: {
              label: "Horizontal",
              type: "select",
              values: ["0.5rem", "0.75rem", "1rem", "1.25rem", "1.5rem"],
              default: "1rem",
            },
            y: {
              label: "Vertical",
              type: "select",
              values: ["0.25rem", "0.5rem", "0.75rem", "1rem"],
              default: "0.5rem",
            },
          },
          preview: true,
        },
        {
          id: "boxShadow",
          label: "Box Shadow",
          type: "select",
          values: [
            "none",
            "0 1px 2px rgba(0,0,0,0.05)",
            "0 4px 6px rgba(0,0,0,0.1)",
            "0 10px 15px rgba(0,0,0,0.1)",
            "0 20px 25px rgba(0,0,0,0.15)",
          ],
          default: "0 1px 2px rgba(0,0,0,0.05)",
          preview: true,
        },
        {
          id: "hoverEffect",
          label: "Hover Effect",
          type: "select",
          values: ["none", "scale", "lift", "opacity"],
          default: "scale",
          preview: true,
        },
        {
          id: "transition",
          label: "Transition Speed",
          type: "select",
          values: ["fast (100ms)", "normal (200ms)", "slow (300ms)"],
          default: "normal (200ms)",
          preview: false,
        },
      ],
    },
    input: {
      name: "Input",
      description: "Customize input field appearance and behavior",
      options: [
        {
          id: "fontSize",
          label: "Font Size",
          type: "select",
          values: ["0.875rem", "1rem", "1.125rem", "1.25rem"],
          default: "1rem",
          preview: true,
        },
        {
          id: "borderWidth",
          label: "Border Width",
          type: "select",
          values: ["1px", "2px", "3px"],
          default: "1px",
          preview: true,
        },
        {
          id: "borderRadius",
          label: "Border Radius",
          type: "select",
          values: ["0rem", "0.375rem", "0.5rem", "0.75rem"],
          default: "0.375rem",
          preview: true,
        },
        {
          id: "padding",
          label: "Padding",
          type: "object",
          fields: {
            x: {
              label: "Horizontal",
              type: "select",
              values: ["0.5rem", "0.75rem", "1rem", "1.25rem"],
              default: "0.75rem",
            },
            y: {
              label: "Vertical",
              type: "select",
              values: ["0.25rem", "0.5rem", "0.75rem"],
              default: "0.5rem",
            },
          },
          preview: true,
        },
        {
          id: "focusShadow",
          label: "Focus Shadow",
          type: "select",
          values: [
            "none",
            "0 0 0 1px currentColor",
            "0 0 0 3px rgba(59, 130, 246, 0.1)",
            "0 0 0 4px rgba(59, 130, 246, 0.2)",
          ],
          default: "0 0 0 3px rgba(59, 130, 246, 0.1)",
          preview: false,
        },
        {
          id: "placeholderOpacity",
          label: "Placeholder Opacity",
          type: "select",
          values: ["0.5", "0.6", "0.7", "0.8"],
          default: "0.6",
          preview: false,
        },
      ],
    },
    card: {
      name: "Card",
      description: "Customize card component styling",
      options: [
        {
          id: "padding",
          label: "Padding",
          type: "object",
          fields: {
            x: {
              label: "Horizontal",
              type: "select",
              values: ["1rem", "1.25rem", "1.5rem", "2rem"],
              default: "1.5rem",
            },
            y: {
              label: "Vertical",
              type: "select",
              values: ["1rem", "1.25rem", "1.5rem", "2rem"],
              default: "1.5rem",
            },
          },
          preview: true,
        },
        {
          id: "borderRadius",
          label: "Border Radius",
          type: "select",
          values: ["0.5rem", "0.75rem", "1rem", "1.5rem"],
          default: "1rem",
          preview: true,
        },
        {
          id: "boxShadow",
          label: "Box Shadow",
          type: "select",
          values: [
            "none",
            "0 1px 3px rgba(0,0,0,0.1)",
            "0 4px 6px rgba(0,0,0,0.1)",
            "0 10px 15px rgba(0,0,0,0.1)",
          ],
          default: "0 1px 3px rgba(0,0,0,0.1)",
          preview: true,
        },
        {
          id: "borderWidth",
          label: "Border Width",
          type: "select",
          values: ["0px", "1px", "2px"],
          default: "0px",
          preview: true,
        },
      ],
    },
    tabs: {
      name: "Tabs",
      description: "Customize tab component appearance",
      options: [
        {
          id: "variant",
          label: "Variant",
          type: "select",
          values: ["default", "pills", "underline"],
          default: "default",
          preview: true,
        },
        {
          id: "size",
          label: "Tab Size",
          type: "select",
          values: ["sm", "md", "lg"],
          default: "md",
          preview: true,
        },
        {
          id: "animated",
          label: "Animated Indicator",
          type: "toggle",
          default: true,
          preview: true,
        },
        {
          id: "fontSize",
          label: "Font Size",
          type: "select",
          values: ["0.875rem", "1rem", "1.125rem"],
          default: "1rem",
          preview: true,
        },
        {
          id: "padding",
          label: "Padding",
          type: "object",
          fields: {
            x: {
              label: "Horizontal",
              type: "select",
              values: ["0.75rem", "1rem", "1.5rem"],
              default: "1rem",
            },
            y: {
              label: "Vertical",
              type: "select",
              values: ["0.5rem", "0.75rem", "1rem"],
              default: "0.5rem",
            },
          },
          preview: true,
        },
        {
          id: "borderRadius",
          label: "Border Radius",
          type: "select",
          values: ["0.375rem", "0.5rem", "0.75rem"],
          default: "0.5rem",
          preview: true,
        },
        {
          id: "indicatorHeight",
          label: "Indicator Height",
          type: "select",
          values: ["2px", "3px", "4px"],
          default: "2px",
          preview: true,
        },
        {
          id: "tabSpacing",
          label: "Tab Spacing",
          type: "select",
          values: ["0.25rem", "0.5rem", "1rem"],
          default: "0.25rem",
          preview: true,
        },
      ],
    },
    pagination: {
      name: "Pagination",
      description: "Customize pagination controls",
      options: [
        {
          id: "size",
          label: "Button Size",
          type: "select",
          values: ["sm", "md", "lg"],
          default: "md",
          preview: true,
        },
        {
          id: "buttonShape",
          label: "Button Shape",
          type: "select",
          values: ["square", "rounded", "circle"],
          default: "rounded",
          preview: true,
        },
        {
          id: "fontSize",
          label: "Font Size",
          type: "select",
          values: ["0.75rem", "0.875rem", "1rem"],
          default: "0.875rem",
          preview: true,
        },
        {
          id: "buttonSpacing",
          label: "Button Spacing",
          type: "select",
          values: ["0.25rem", "0.5rem", "0.75rem"],
          default: "0.5rem",
          preview: true,
        },
        {
          id: "borderWidth",
          label: "Border Width",
          type: "select",
          values: ["1px", "2px"],
          default: "1px",
          preview: true,
        },
        {
          id: "borderRadius",
          label: "Border Radius",
          type: "select",
          values: ["0.25rem", "0.5rem", "0.75rem", "9999px"],
          default: "0.5rem",
          preview: true,
        },
        {
          id: "padding",
          label: "Padding",
          type: "object",
          fields: {
            x: {
              label: "Horizontal",
              type: "select",
              values: ["0.5rem", "0.75rem", "1rem"],
              default: "0.75rem",
            },
            y: {
              label: "Vertical",
              type: "select",
              values: ["0.25rem", "0.5rem", "0.75rem"],
              default: "0.5rem",
            },
          },
          preview: true,
        },
      ],
    },
    dialog: {
      name: "Dialog",
      description: "Customize dialog/modal appearance",
      options: [
        {
          id: "borderRadius",
          label: "Border Radius",
          type: "select",
          values: ["0.5rem", "0.75rem", "1rem", "1.5rem"],
          default: "1rem",
          preview: true,
        },
        {
          id: "backdropOpacity",
          label: "Backdrop Opacity",
          type: "select",
          values: ["0.3", "0.5", "0.7", "0.9"],
          default: "0.5",
          preview: false,
        },
        {
          id: "width",
          label: "Width",
          type: "select",
          values: ["400px", "500px", "600px", "800px"],
          default: "500px",
          preview: true,
        },
        {
          id: "padding",
          label: "Padding",
          type: "object",
          fields: {
            x: {
              label: "Horizontal",
              type: "select",
              values: ["1.5rem", "2rem", "2.5rem"],
              default: "1.5rem",
            },
            y: {
              label: "Vertical",
              type: "select",
              values: ["1.5rem", "2rem", "2.5rem"],
              default: "1.5rem",
            },
          },
          preview: true,
        },
        {
          id: "borderTopWidth",
          label: "Accent Border Width",
          type: "select",
          values: ["0px", "3px", "5px", "8px"],
          default: "5px",
          preview: true,
        },
        {
          id: "boxShadow",
          label: "Box Shadow",
          type: "select",
          values: [
            "0 10px 25px rgba(0,0,0,0.1)",
            "0 20px 40px rgba(0,0,0,0.15)",
            "0 25px 50px rgba(0,0,0,0.2)",
          ],
          default: "0 20px 40px rgba(0,0,0,0.15)",
          preview: true,
        },
        {
          id: "animation",
          label: "Animation",
          type: "select",
          values: ["fade", "slide", "scale"],
          default: "fade",
          preview: false,
        },
      ],
    },
    navbar: {
      name: "Navbar",
      description: "Customize navigation bar appearance and spacing",
      options: [
        {
          id: "linkPadding",
          label: "Link Padding",
          type: "object",
          fields: {
            x: {
              label: "Horizontal",
              type: "select",
              values: ["0.25rem", "0.5rem", "0.75rem", "1rem"],
              default: "0.625rem",
            },
            y: {
              label: "Vertical",
              type: "select",
              values: ["0.25rem", "0.375rem", "0.5rem", "0.75rem"],
              default: "0.375rem",
            },
          },
          preview: true,
        },
        {
          id: "linkFontSize",
          label: "Link Font Size",
          type: "select",
          values: ["0.875rem", "1rem", "1.125rem"],
          default: "1rem",
          preview: true,
        },
        {
          id: "linkBorderRadius",
          label: "Link Border Radius",
          type: "select",
          values: ["4px", "6px", "8px", "12px"],
          default: "8px",
          preview: true,
        },
        {
          id: "linkSpacing",
          label: "Link Spacing",
          type: "select",
          values: ["0.5rem", "0.75rem", "1rem", "1.5rem"],
          default: "0.75rem",
          preview: true,
        },
        {
          id: "logoSize",
          label: "Logo Size",
          type: "select",
          values: ["32px", "36px", "40px", "48px"],
          default: "32px",
          preview: true,
        },
        {
          id: "height",
          label: "Navbar Height",
          type: "select",
          values: ["3rem", "3.5rem", "4rem", "4.5rem"],
          default: "3rem",
          preview: true,
        },
        {
          id: "transition",
          label: "Transition Speed",
          type: "select",
          values: ["fast (100ms)", "normal (160ms)", "slow (300ms)"],
          default: "normal (160ms)",
          preview: false,
        },
      ],
    },
    carousel: {
      name: "Carousel",
      description: "Customize carousel appearance and transitions",
      options: [
        {
          id: "borderRadius",
          label: "Border Radius",
          type: "select",
          values: ["0.5rem", "0.75rem", "1rem", "1.5rem"],
          default: "0.75rem",
          preview: true,
        },
        {
          id: "indicatorSize",
          label: "Indicator Size",
          type: "select",
          values: ["8px", "10px", "12px", "16px"],
          default: "12px",
          preview: true,
        },
        {
          id: "indicatorSpacing",
          label: "Indicator Spacing",
          type: "select",
          values: ["0.25rem", "0.5rem", "0.75rem"],
          default: "0.5rem",
          preview: true,
        },
        {
          id: "arrowSize",
          label: "Arrow Size",
          type: "select",
          values: ["sm", "md", "lg"],
          default: "md",
          preview: true,
        },
        {
          id: "arrowOpacity",
          label: "Arrow Opacity",
          type: "select",
          values: ["0.3", "0.5", "0.7"],
          default: "0.3",
          preview: true,
        },
        {
          id: "transitionDuration",
          label: "Transition Duration",
          type: "select",
          values: ["300ms", "500ms", "700ms"],
          default: "500ms",
          preview: false,
        },
      ],
    },
    dropdown: {
      name: "Dropdown",
      description: "Customize dropdown menu styling",
      options: [
        {
          id: "borderRadius",
          label: "Border Radius",
          type: "select",
          values: ["0.375rem", "0.5rem", "0.75rem", "1rem"],
          default: "0.5rem",
          preview: true,
        },
        {
          id: "borderWidth",
          label: "Border Width",
          type: "select",
          values: ["1px", "2px"],
          default: "1px",
          preview: true,
        },
        {
          id: "itemPadding",
          label: "Item Padding",
          type: "object",
          fields: {
            x: {
              label: "Horizontal",
              type: "select",
              values: ["0.75rem", "1rem", "1.25rem"],
              default: "1rem",
            },
            y: {
              label: "Vertical",
              type: "select",
              values: ["0.5rem", "0.75rem", "1rem"],
              default: "0.5rem",
            },
          },
          preview: true,
        },
        {
          id: "fontSize",
          label: "Font Size",
          type: "select",
          values: ["0.875rem", "1rem", "1.125rem"],
          default: "1rem",
          preview: true,
        },
        {
          id: "boxShadow",
          label: "Box Shadow",
          type: "select",
          values: [
            "none",
            "0 2px 4px rgba(0,0,0,0.1)",
            "0 4px 8px rgba(0,0,0,0.15)",
            "0 10px 20px rgba(0,0,0,0.2)",
          ],
          default: "0 4px 8px rgba(0,0,0,0.15)",
          preview: true,
        },
      ],
    },
    progress: {
      name: "Progress",
      description: "Customize progress bar appearance",
      options: [
        {
          id: "size",
          label: "Size",
          type: "select",
          values: ["sm", "md", "lg"],
          default: "md",
          preview: true,
        },
        {
          id: "variant",
          label: "Variant",
          type: "select",
          values: ["default", "gradient", "striped"],
          default: "default",
          preview: true,
        },
        {
          id: "animated",
          label: "Animated",
          type: "toggle",
          default: false,
          preview: true,
        },
        {
          id: "showLabel",
          label: "Show Label",
          type: "toggle",
          default: false,
          preview: true,
        },
        {
          id: "borderRadius",
          label: "Border Radius",
          type: "select",
          values: ["0", "0.25rem", "0.5rem", "9999px"],
          default: "9999px",
          preview: true,
        },
      ],
    },
  };

  const config = componentConfigs[activeComponent];

  // Handle option change
  const handleOptionChange = async (optionId: string, value: any) => {
    setLivePreview((prev: any) => ({
      ...prev,
      [optionId]: value,
    }));

    setCustomizing(true);
    try {
      const settings = {
        ...savedConfigurations[activeComponent],
        [optionId]: value,
      };
      await customizeComponent(activeComponent, settings);
      setSavedConfigurations((prev: any) => ({
        ...prev,
        [activeComponent]: settings,
      }));
      if (onCustomizationChange) {
        onCustomizationChange({
          component: activeComponent,
          settings,
        });
      }
    } catch (err) {
      console.error("Error customizing component:", err);
    } finally {
      setCustomizing(false);
    }
  };

  // Render input based on type
  const renderInput = (option: any) => {
    if (option.type === "select") {
      return (
        <select
          value={livePreview[option.id] || option.default}
          onChange={(e) => handleOptionChange(option.id, e.target.value)}
          disabled={customizing}
          className="w-full px-3 py-2 border border-gray-300 text-black rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {option.values.map((val: string) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      );
    } else if (option.type === "toggle") {
      return (
        <button
          onClick={() =>
            handleOptionChange(
              option.id,
              !(livePreview[option.id] ?? option.default),
            )
          }
          disabled={customizing}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            (livePreview[option.id] ?? option.default)
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {(livePreview[option.id] ?? option.default) ? "Enabled" : "Disabled"}
        </button>
      );
    } else if (option.type === "object") {
      return (
        <div className="space-y-2">
          {Object.entries(option.fields).map(([key, field]: any) => (
            <div key={key}>
              <label className="text-xs font-medium text-gray-600">
                {field.label}
              </label>
              <select
                value={livePreview[option.id]?.[key] || field.default || ""}
                onChange={(e) => {
                  const current = livePreview[option.id] || {};
                  handleOptionChange(option.id, {
                    ...current,
                    [key]: e.target.value,
                  });
                }}
                disabled={customizing}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm mt-1"
              >
                {field.values.map((val: string) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="p-4">
        <p>Loading component personalizer...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-700">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card
        title="Component Personalizer"
        description="Fine-tune individual component styling, sizes, and effects"
        variant="elevated"
      >
        {/* COMPONENT SELECTOR */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Select Component</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Object.entries(componentConfigs).map(([key, cfg]: any) => (
              <Button
                key={key}
                variant={activeComponent === key ? "solid" : "outline"}
                onClick={() => {
                  setActiveComponent(key);
                  setLivePreview({});
                }}
                disabled={customizing}
                className="w-full text-sm"
              >
                {cfg.name}
              </Button>
            ))}
          </div>
          {config && (
            <p className="text-sm text-gray-600 mt-2">{config.description}</p>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6">
          {/* CUSTOMIZATION OPTIONS */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Customize {config?.name}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LEFT COLUMN: CONTROLS */}
              <div className="space-y-4">
                {config?.options.map((option: any) => (
                  <div key={option.id}>
                    <label className="block text-sm font-medium text-white mb-2">
                      {option.label}
                    </label>
                    {renderInput(option)}
                    {option.preview && livePreview[option.id] && (
                      <p className="text-xs text-black mt-1">
                        Value: {JSON.stringify(livePreview[option.id])}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* RIGHT COLUMN: LIVE PREVIEW */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="text-sm font-semibold mb-4 text-gray-700">
                  Live Preview
                </h4>

                {/* Button Preview */}
                {activeComponent === "button" && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Default:</p>
                      <Button variant="solid">Click Me</Button>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-2">
                        With Customization:
                      </p>
                      <Button
                        variant="solid"
                        style={{
                          fontSize: livePreview["textSize"] || "1rem",
                          fontWeight: livePreview["fontWeight"] || "600",
                          letterSpacing:
                            livePreview["letterSpacing"] || "normal",
                          borderRadius: livePreview["borderRadius"] || "0.5rem",
                          padding: livePreview["padding"]
                            ? `${livePreview["padding"].y} ${livePreview["padding"].x}`
                            : "0.5rem 1rem",
                          boxShadow:
                            livePreview["boxShadow"] ||
                            "0 1px 2px rgba(0,0,0,0.05)",
                          transform:
                            livePreview["hoverEffect"] === "scale"
                              ? "scale(1)"
                              : "none",
                        }}
                      >
                        Click Me
                      </Button>
                    </div>
                  </div>
                )}

                {/* Input Preview */}
                {activeComponent === "input" && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Default:</p>
                      <Input placeholder="Enter text..." />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-2">
                        With Customization:
                      </p>
                      <Input
                        placeholder="Enter text..."
                        style={{
                          fontSize: livePreview["fontSize"] || "1rem",
                          borderWidth: livePreview["borderWidth"] || "1px",
                          borderRadius:
                            livePreview["borderRadius"] || "0.375rem",
                          padding: livePreview["padding"]
                            ? `${livePreview["padding"].y} ${livePreview["padding"].x}`
                            : "0.5rem 0.75rem",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Card Preview */}
                {activeComponent === "card" && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Default:</p>
                      <Card title="Card Title">Card content here</Card>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-2">
                        With Customization:
                      </p>
                      <Card title="Card Title">
                        <div
                          style={{
                            padding: livePreview["padding"]
                              ? `${livePreview["padding"].y} ${livePreview["padding"].x}`
                              : "1.5rem",
                            borderRadius: livePreview["borderRadius"] || "1rem",
                            boxShadow:
                              livePreview["boxShadow"] ||
                              "0 1px 3px rgba(0,0,0,0.1)",
                          }}
                        >
                          Card content here
                        </div>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Navbar Preview */}
                {activeComponent === "navbar" && (
                  <div className="space-y-4">
                    <p className="text-xs text-gray-600 mb-2">
                      With Customization:
                    </p>
                    <div
                      className="rounded-lg overflow-hidden"
                      style={{
                        height: livePreview["height"] || "3rem",
                      }}
                    >
                      <LibNavbar
                        brand={
                          <div
                            style={{
                              width: livePreview["logoSize"] || "32px",
                              height: livePreview["logoSize"] || "32px",
                            }}
                            className="rounded-md bg-[var(--primary)] flex items-center justify-center text-white font-bold"
                          >
                            N
                          </div>
                        }
                        links={[
                          { href: "#", label: "Home" },
                          { href: "#", label: "Docs" },
                          { href: "#", label: "About" },
                        ]}
                        className="rounded-lg"
                      />
                      <style jsx>{`
                        .nav-link span {
                          padding: ${livePreview["linkPadding"]?.y ||
                            "0.375rem"}
                            ${livePreview["linkPadding"]?.x || "0.625rem"} !important;
                          font-size: ${livePreview["linkFontSize"] ||
                          "1rem"} !important;
                          border-radius: ${livePreview["linkBorderRadius"] ||
                          "8px"} !important;
                        }
                        .nav-link {
                          margin-right: ${livePreview["linkSpacing"] ||
                          "0.75rem"} !important;
                        }
                      `}</style>
                    </div>
                  </div>
                )}

                {/* Carousel Preview */}
                {activeComponent === "carousel" && (
                  <div className="space-y-4">
                    <p className="text-xs text-gray-600 mb-2">
                      With Customization:
                    </p>
                    <div
                      style={{
                        borderRadius: livePreview["borderRadius"] || "0.75rem",
                        overflow: "hidden",
                      }}
                    >
                      <Carousel
                        slides={[
                          <div
                            key="1"
                            className="h-48 flex items-center justify-center bg-blue-500 text-white text-2xl font-bold"
                          >
                            Slide 1
                          </div>,
                          <div
                            key="2"
                            className="h-48 flex items-center justify-center bg-purple-500 text-white text-2xl font-bold"
                          >
                            Slide 2
                          </div>,
                          <div
                            key="3"
                            className="h-48 flex items-center justify-center bg-pink-500 text-white text-2xl font-bold"
                          >
                            Slide 3
                          </div>,
                        ]}
                      />
                      <style jsx>{`
                        .carousel-indicator {
                          width: ${livePreview["indicatorSize"] || "12px"};
                          height: ${livePreview["indicatorSize"] || "12px"};
                          margin: 0
                            ${livePreview["indicatorSpacing"] || "0.5rem"};
                        }
                        .carousel-arrow {
                          opacity: ${livePreview["arrowOpacity"] || "0.3"};
                          padding: ${livePreview["arrowSize"] === "sm"
                            ? "0.5rem"
                            : livePreview["arrowSize"] === "lg"
                              ? "1rem"
                              : "0.75rem"};
                        }
                      `}</style>
                    </div>
                  </div>
                )}

                {/* Dropdown Preview */}
                {activeComponent === "dropdown" && (
                  <div className="space-y-4">
                    <p className="text-xs text-gray-600 mb-2">
                      With Customization:
                    </p>
                    <Dropdown
                      label="Select Option"
                      items={[
                        { label: "Option 1", value: "1" },
                        { label: "Option 2", value: "2" },
                        { label: "Option 3", value: "3" },
                      ]}
                      className="w-full"
                    />
                    <style jsx>{`
                      .dropdown-button,
                      .dropdown-menu {
                        border-radius: ${livePreview["borderRadius"] ||
                        "0.5rem"} !important;
                        border-width: ${livePreview["borderWidth"] ||
                        "1px"} !important;
                        box-shadow: ${livePreview["boxShadow"] ||
                        "0 4px 8px rgba(0,0,0,0.15)"} !important;
                      }
                      .dropdown-item {
                        padding: ${livePreview["itemPadding"]?.y || "0.5rem"}
                          ${livePreview["itemPadding"]?.x || "1rem"} !important;
                        font-size: ${livePreview["fontSize"] ||
                        "1rem"} !important;
                      }
                    `}</style>
                  </div>
                )}

                {/* Progress Preview */}
                {activeComponent === "progress" && (
                  <div className="space-y-4">
                    <p className="text-xs text-gray-600 mb-2">
                      With Customization:
                    </p>
                    <Progress
                      value={65}
                      max={100}
                      size={(livePreview["size"] as "sm" | "md" | "lg") || "md"}
                      variant={
                        (livePreview["variant"] as
                          | "default"
                          | "gradient"
                          | "striped") || "default"
                      }
                      animated={livePreview["animated"] || false}
                      showLabel={livePreview["showLabel"] || false}
                      style={{
                        borderRadius: livePreview["borderRadius"] || "9999px",
                      }}
                    />
                  </div>
                )}

                {/* Tabs Preview */}
                {activeComponent === "tabs" && (
                  <div className="space-y-4">
                    <p className="text-xs text-gray-600 mb-2">
                      With Customization:
                    </p>
                    <Tabs
                      items={[
                        {
                          id: "tab1",
                          label: "Tab 1",
                          content: <div className="p-4">Content 1</div>,
                        },
                        {
                          id: "tab2",
                          label: "Tab 2",
                          content: <div className="p-4">Content 2</div>,
                        },
                        {
                          id: "tab3",
                          label: "Tab 3",
                          content: <div className="p-4">Content 3</div>,
                        },
                      ]}
                      variant={
                        (livePreview["variant"] as
                          | "default"
                          | "pills"
                          | "underline") || "default"
                      }
                      size={(livePreview["size"] as "sm" | "md" | "lg") || "md"}
                    />
                    <style jsx>{`
                      .tab-button {
                        font-size: ${livePreview["fontSize"] ||
                        "1rem"} !important;
                        padding: ${livePreview["padding"]?.y || "0.5rem"}
                          ${livePreview["padding"]?.x || "1rem"} !important;
                        border-radius: ${livePreview["borderRadius"] ||
                        "0.5rem"} !important;
                        margin-right: ${livePreview["tabSpacing"] ||
                        "0.25rem"} !important;
                      }
                      .tab-indicator {
                        height: ${livePreview["indicatorHeight"] ||
                        "2px"} !important;
                      }
                    `}</style>
                  </div>
                )}

                {/* Pagination Preview */}
                {activeComponent === "pagination" && (
                  <div className="space-y-4">
                    <p className="text-xs text-gray-600 mb-2">
                      With Customization:
                    </p>
                    <Pagination
                      currentPage={2}
                      totalPages={5}
                      onPageChange={() => {}}
                    />
                    <style jsx>{`
                      .pagination-button {
                        font-size: ${livePreview["fontSize"] ||
                        "0.875rem"} !important;
                        border-width: ${livePreview["borderWidth"] ||
                        "1px"} !important;
                        border-radius: ${livePreview["borderRadius"] ||
                        livePreview["buttonShape"] === "circle"
                          ? "9999px"
                          : "0.5rem"} !important;
                        padding: ${livePreview["padding"]?.y || "0.5rem"}
                          ${livePreview["padding"]?.x || "0.75rem"} !important;
                        margin: 0 ${livePreview["buttonSpacing"] || "0.5rem"} !important;
                      }
                    `}</style>
                  </div>
                )}

                {/* Dialog Preview */}
                {activeComponent === "dialog" && (
                  <div className="space-y-4">
                    <p className="text-xs text-gray-600 mb-2">
                      Click to preview dialog:
                    </p>
                    <Button
                      variant="solid"
                      onClick={() => {
                        const dialog = document.createElement("div");
                        dialog.innerHTML = `
                          <div style="
                            position: fixed;
                            inset: 0;
                            background: rgba(0,0,0,${livePreview["backdropOpacity"] || "0.5"});
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            z-index: 9999;
                          ">
                            <div style="
                              background: white;
                              border-radius: ${livePreview["borderRadius"] || "1rem"};
                              width: ${livePreview["width"] || "500px"};
                              padding: ${livePreview["padding"]?.y || "1.5rem"} ${livePreview["padding"]?.x || "1.5rem"};
                              border-top: ${livePreview["borderTopWidth"] || "5px"} solid var(--primary, #3b82f6);
                              box-shadow: ${livePreview["boxShadow"] || "0 20px 40px rgba(0,0,0,0.15)"};
                            ">
                              <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem;">Dialog Title</h3>
                              <p>This is a preview of the customized dialog.</p>
                              <button onclick="this.closest('[style*=fixed]').remove()" style="
                                margin-top: 1rem;
                                padding: 0.5rem 1rem;
                                background: var(--primary, #3b82f6);
                                color: white;
                                border: none;
                                border-radius: 0.375rem;
                                cursor: pointer;
                              ">Close</button>
                            </div>
                          </div>
                        `;
                        document.body.appendChild(dialog);
                      }}
                    >
                      Show Dialog Preview
                    </Button>
                  </div>
                )}

                {/* Generic Preview */}
                {![
                  "button",
                  "input",
                  "card",
                  "navbar",
                  "carousel",
                  "dropdown",
                  "progress",
                  "tabs",
                  "pagination",
                  "dialog",
                ].includes(activeComponent) && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Live preview not yet available</p>
                    <p className="text-xs mt-2">
                      Customizations are saved to the backend
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SAVE STATUS */}
          {customizing && (
            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded text-blue-700 text-sm">
              Saving customizations...
            </div>
          )}

          {savedConfigurations[activeComponent] && (
            <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
              ✓ Customizations saved for {config?.name}
            </div>
          )}
        </div>
      </Card>

      {/* HELP SECTION */}
      <Card title="Tips" variant="bordered">
        <ul className="space-y-2 text-sm text-white">
          <li>
            ✓ <strong>Select a component</strong> from the buttons above
          </li>
          <li>
            ✓ <strong>Adjust settings</strong> using the controls on the left
          </li>
          <li>
            ✓ <strong>Watch the preview</strong> update in real-time on the
            right
          </li>
          <li>
            ✓ <strong>Changes are saved automatically</strong> to the backend
          </li>
          <li>
            ✓ All customizations are applied <strong>per user</strong> and
            persist across sessions
          </li>
        </ul>
      </Card>
    </div>
  );
}
