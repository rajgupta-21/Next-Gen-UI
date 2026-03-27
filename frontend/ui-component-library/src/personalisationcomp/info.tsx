import Customisation from "./customisation";

const Info = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      {/* How It Works */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/30 backdrop-blur-sm hover:border-purple-400/60 transition-all">
        <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text mb-6">
          📖 How It Works
        </h3>
        <ol className="space-y-4 text-gray-300 text-sm">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white flex items-center justify-center text-xs font-bold">
              1
            </span>
            <div>
              <strong className="text-purple-300">Theme Customization:</strong>
              <p className="text-gray-400 text-xs mt-1">
                Choose colors, fonts, and apply presets to your entire library
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white flex items-center justify-center text-xs font-bold">
              2
            </span>
            <div>
              <strong className="text-purple-300">Component Settings:</strong>
              <p className="text-gray-400 text-xs mt-1">
                Fine-tune individual components beyond theme settings
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white flex items-center justify-center text-xs font-bold">
              3
            </span>
            <div>
              <strong className="text-indigo-300">Live Preview:</strong>
              <p className="text-gray-400 text-xs mt-1">
                See changes instantly in the preview panels
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white flex items-center justify-center text-xs font-bold">
              4
            </span>
            <div>
              <strong className="text-indigo-300">Auto-Save:</strong>
              <p className="text-gray-400 text-xs mt-1">
                All changes are automatically saved to your profile
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white flex items-center justify-center text-xs font-bold">
              5
            </span>
            <div>
              <strong className="text-indigo-300">
                Persist Across Sessions:
              </strong>
              <p className="text-gray-400 text-xs mt-1">
                Your customizations follow you wherever you use the components
              </p>
            </div>
          </li>
        </ol>
      </div>

      {/* Component Customization Guide */}
      <Customisation />
    </div>
  );
};

export default Info;
