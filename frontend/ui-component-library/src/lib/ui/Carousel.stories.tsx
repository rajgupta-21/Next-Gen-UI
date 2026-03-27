import { useState } from "react";
import LocalThemeControls from "../../components/LocalThemeControls";
import Carousel from "./Carousel";

export default {
  title: "UI/Carousel",
  component: Carousel,
};

export const Default = () => {
  const [theme, setTheme] = useState({
    background: "#f3f3f3",
    indicator: "#7C3AED",
    inactiveIndicator: "#999",
  });

  const slides = [
    <div className="h-48 flex items-center justify-center bg-red-300 text-white text-2xl rounded-xl">
      Slide 1
    </div>,
    <div className="h-48 flex items-center justify-center bg-green-300 text-white text-2xl rounded-xl">
      Slide 2
    </div>,
    <div className="h-48 flex items-center justify-center bg-blue-300 text-white text-2xl rounded-xl">
      Slide 3
    </div>,
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto p-4">
      <h3 className="text-xl font-semibold">Carousel Preview</h3>

      <Carousel slides={slides} theme={theme} />

      <div className="glass-card p-4 rounded-2xl">
        <h4 className="font-semibold mb-2">Customize Carousel Colors</h4>
        <LocalThemeControls
          onChange={(v) =>
            setTheme({
              background: v.background || "#f3f3f3",
              indicator: v.primary || "#7C3AED",
              inactiveIndicator: v.secondary || "#999",
            })
          }
        />
      </div>
    </div>
  );
};
