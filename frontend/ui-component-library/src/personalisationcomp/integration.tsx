const Integration = () => {
  return (
    <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-indigo-500/30 backdrop-blur-sm">
      <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text mb-6">
        🔌 Using Personalization in Your App
      </h3>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-indigo-300 mb-3">
            1. Import and Use
          </h4>
          <pre className="bg-slate-900/50 border border-indigo-500/20 p-4 rounded-lg text-sm overflow-auto text-gray-300">
            {`import ComponentPersonalizer from "@/components/ComponentPersonalizer";

export default function SettingsPage() {
  return (
    <ComponentPersonalizer
      userId={currentUserId}
      onCustomizationChange={(data) => {
        console.log("Customization:", data);
      }}
    />
  );
}`}
          </pre>
        </div>
        <div>
          <h4 className="font-semibold text-blue-300 mb-3">2. Use the Hook</h4>
          <pre className="bg-slate-900/50 border border-blue-500/20 p-4 rounded-lg text-sm overflow-auto text-gray-300">
            {`import { useTheme } from "@/contexts/ThemeContext";

export default function MyComponent() {
  const { customizeComponent, applyPreset, theme } = useTheme();

  const handleCustomize = async () => {
    await customizeComponent("button", {
      textSize: "1.25rem",
      fontWeight: 700
    });
  };

  return <button onClick={handleCustomize}>Customize</button>;
}`}
          </pre>
        </div>
        <div>
          <h4 className="font-semibold text-purple-300 mb-3">
            3. Apply Component Styles
          </h4>
          <pre className="bg-slate-900/50 border border-purple-500/20 p-4 rounded-lg text-sm overflow-auto text-gray-300">
            {`import { useComponentStyles } from "@/hooks/useComponentStyles";

export default function MyComponent() {
  const buttonStyles = useComponentStyles("button");

  return <Button style={buttonStyles}>Styled Button</Button>;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Integration;
