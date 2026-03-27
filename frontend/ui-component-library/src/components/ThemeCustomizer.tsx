// frontend/ui-component-library/src/components/ThemeCustomizer.tsx
// Example component demonstrating how to use the personalization backend

"use client";

import { useTheme } from "@/contexts/ThemeContext";
import Button from "@/lib/ui/Button";
import Card from "@/lib/ui/Card";
import Input from "@/lib/ui/Input";
import { useEffect, useState } from "react";

interface ThemeCustomizerProps {
  userId: string;
  onThemeChange?: (theme: any) => void;
}

export default function ThemeCustomizer({
  userId,
  onThemeChange,
}: ThemeCustomizerProps) {
  const {
    theme,
    loading,
    error,
    updateTheme,
    customizeComponent,
    applyPreset,
    getPresets,
  } = useTheme();

  const [presets, setPresets] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<
    "colors" | "typography" | "components"
  >("colors");
  const [customizing, setCustomizing] = useState(false);

  // Load presets on mount
  useEffect(() => {
    const loadPresets = async () => {
      const data = await getPresets();
      setPresets(data);
    };
    loadPresets();
  }, [getPresets]);

  // Notify parent of theme changes
  useEffect(() => {
    if (theme && onThemeChange) {
      onThemeChange(theme);
    }
  }, [theme, onThemeChange]);

  if (loading) {
    return (
      <div className="p-4">
        <p>Loading theme customizer...</p>
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

  if (!theme) {
    return (
      <div className="p-4">
        <p>No theme found. Creating default theme...</p>
      </div>
    );
  }

  // ============================================================================
  // COLOR CUSTOMIZATION
  // ============================================================================
  const handleColorChange = async (colorKey: string, value: string) => {
    setCustomizing(true);
    await updateTheme({
      colors: {
        ...theme.colors,
        [colorKey]: value,
      },
    });
    setCustomizing(false);
  };

  // ============================================================================
  // TYPOGRAPHY CUSTOMIZATION
  // ============================================================================
  const handleTypographyChange = async (typographyKey: string, value: any) => {
    setCustomizing(true);
    await updateTheme({
      typography: {
        ...theme.typography,
        [typographyKey]: value,
      },
    });
    setCustomizing(false);
  };

  // ============================================================================
  // BUTTON CUSTOMIZATION
  // ============================================================================
  const handleButtonCustomization = async (settings: any) => {
    setCustomizing(true);
    await customizeComponent("button", settings);
    setCustomizing(false);
  };

  // ============================================================================
  // PRESET APPLICATION
  // ============================================================================
  const handlePresetApply = async (presetId: string) => {
    setCustomizing(true);
    await applyPreset(presetId);
    setCustomizing(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card
        title="Theme Customizer"
        description="Personalize your component library experience"
        variant="elevated"
      >
        {/* PRESET SECTION */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Quick Presets</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {presets.map((preset) => (
              <Button
                key={preset.id}
                variant={theme.name === preset.name ? "solid" : "outline"}
                onClick={() => handlePresetApply(preset.id)}
                disabled={customizing}
                className="w-full"
              >
                {preset.name}
              </Button>
            ))}
          </div>
          {presets.length > 0 && (
            <p className="text-sm text-gray-500">
              {presets.find((p) => p.name === theme.name)?.description}
            </p>
          )}
        </div>

        {/* TABS */}
        <div className="border-b border-gray-200 mb-4">
          <div className="flex gap-4">
            {(["colors", "typography", "components"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-1 border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600 font-semibold"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* COLORS TAB */}
        {activeTab === "colors" && (
          <div className="space-y-4">
            <h4 className="font-semibold mb-4">Color Palette</h4>
            {Object.entries(theme.colors || {}).map(([key, value]) => (
              <div key={key} className="flex items-center gap-4">
                <label className="w-32 capitalize text-sm font-medium text-gray-700">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={String(value)}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    disabled={customizing}
                    className="w-12 h-10 border rounded cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={String(value)}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    disabled={customizing}
                    className="w-32 text-sm font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TYPOGRAPHY TAB */}
        {activeTab === "typography" && (
          <div className="space-y-4">
            <h4 className="font-semibold mb-4">Typography Settings</h4>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Family
              </label>
              <Input
                type="text"
                value={theme.typography?.fontFamily || ""}
                onChange={(e) =>
                  handleTypographyChange("fontFamily", e.target.value)
                }
                disabled={customizing}
                className="w-full"
                placeholder="e.g., 'Inter', 'system-ui', sans-serif"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Font Size (px)
              </label>
              <Input
                type="number"
                value={theme.typography?.baseFontSize || 16}
                onChange={(e) =>
                  handleTypographyChange(
                    "baseFontSize",
                    parseInt(e.target.value)
                  )
                }
                disabled={customizing}
                className="w-full"
                min="12"
                max="24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Line Height
              </label>
              <Input
                type="number"
                value={theme.typography?.lineHeight || 1.5}
                onChange={(e) =>
                  handleTypographyChange(
                    "lineHeight",
                    parseFloat(e.target.value)
                  )
                }
                disabled={customizing}
                className="w-full"
                min="1"
                max="2"
                step="0.1"
              />
            </div>
          </div>
        )}

        {/* COMPONENTS TAB */}
        {activeTab === "components" && (
          <div className="space-y-6">
            <h4 className="font-semibold mb-4">Component Customization</h4>

            {/* BUTTON CUSTOMIZATION */}
            <Card title="Button" variant="bordered" className="bg-gray-50">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Size
                  </label>
                  <select
                    onChange={(e) =>
                      handleButtonCustomization({
                        textSize: e.target.value,
                      })
                    }
                    disabled={customizing}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option>0.875rem</option>
                    <option selected>1rem</option>
                    <option>1.125rem</option>
                    <option>1.25rem</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Weight
                  </label>
                  <select
                    onChange={(e) =>
                      handleButtonCustomization({
                        fontWeight: parseInt(e.target.value),
                      })
                    }
                    disabled={customizing}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="400">Normal (400)</option>
                    <option selected value="500">
                      Medium (500)
                    </option>
                    <option value="600">Semibold (600)</option>
                    <option value="700">Bold (700)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Border Radius
                  </label>
                  <select
                    onChange={(e) =>
                      handleButtonCustomization({
                        borderRadius: e.target.value,
                      })
                    }
                    disabled={customizing}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option>0.25rem</option>
                    <option>0.5rem</option>
                    <option selected>0.5rem</option>
                    <option>0.75rem</option>
                    <option>1rem</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hover Effect
                  </label>
                  <select
                    onChange={(e) =>
                      handleButtonCustomization({
                        hoverEffect: e.target.value,
                      })
                    }
                    disabled={customizing}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option selected>opacity</option>
                    <option>scale</option>
                    <option>lift</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* SAVE STATUS */}
        {customizing && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-700">Saving changes...</p>
          </div>
        )}
      </Card>

      {/* PREVIEW SECTION */}
      <Card title="Live Preview" variant="bordered">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Button Preview</p>
            <Button variant="solid">Click Me</Button>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Typography Preview</p>
            <p
              style={{
                fontFamily: theme.typography?.fontFamily,
                fontSize: `${theme.typography?.baseFontSize}px`,
                lineHeight: theme.typography?.lineHeight,
              }}
            >
              This is a preview of your custom typography settings applied to
              the UI components.
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Color Palette</p>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(theme.colors || {}).map(([key, value]) => (
                <div
                  key={key}
                  className="h-16 rounded border border-gray-200"
                  style={{ backgroundColor: String(value) }}
                  title={key}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
