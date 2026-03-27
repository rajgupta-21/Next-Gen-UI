import { useState } from "react";
import LocalThemeControls from "../../components/LocalThemeControls";
import Dropdown from "./Dropdown";

export default {
  title: "UI/Dropdown",
  component: Dropdown,
};

export const Default = () => {
  const [theme, setTheme] = useState({
    background: "#ffffff",
    text: "#111111",
    border: "#7C3AED",
    hover: "#E0D7F8",
  });

  const items = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto p-4">
      <h3 className="text-xl font-semibold">Dropdown Preview</h3>

      <Dropdown label="Select an Option" items={items} theme={theme} />

      <div className="glass-card p-4 rounded-2xl">
        <h4 className="font-semibold mb-2">Customize Dropdown Colors</h4>
        <LocalThemeControls
          onChange={(v) =>
            setTheme({
              background: v.background || "#ffffff",
              text: v.text || "#111111",
              border: v.primary || "#7C3AED",
              hover: v.secondary || "#E0D7F8",
            })
          }
        />
      </div>
    </div>
  );
};
