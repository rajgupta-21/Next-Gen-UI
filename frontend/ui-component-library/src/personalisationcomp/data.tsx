const Data = () => {
  return (
    <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/30 backdrop-blur-sm">
      <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text mb-6">
        📊 What's Being Saved
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-purple-300 mb-3">Theme Data:</h4>
          <pre className="bg-slate-900/50 border border-purple-500/20 p-4 rounded-lg text-xs overflow-auto max-h-48 text-gray-300">
            {`{
  colors: {
    primary: "#a855f7",
    accent: "#6366f1",
    background: "#ffffff",
    text: "#111111",
    border: "#e5e7eb"
  },
  typography: {
    fontFamily: "system-ui",
    baseFontSize: 16,
    lineHeight: 1.5
  }
}`}
          </pre>
        </div>
        <div>
          <h4 className="font-semibold text-indigo-300 mb-3">
            Component Customizations:
          </h4>
          <pre className="bg-slate-900/50 border border-indigo-500/20 p-4 rounded-lg text-xs overflow-auto max-h-48 text-gray-300">
            {`{
  button: {
    textSize: "1rem",
    fontWeight: 600,
    padding: {
      x: "1rem",
      y: "0.5rem"
    },
    borderRadius: "0.5rem",
    hoverEffect: "scale"
  },
  input: { ... },
  card: { ... }
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Data;
