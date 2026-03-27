const Customisation = () => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-indigo-500/30 backdrop-blur-sm hover:border-indigo-400/60 transition-all">
      <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text mb-6">
        ⚙️ Available Customizations
      </h3>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="p-3 bg-slate-700/50 rounded-lg border border-purple-500/20">
          <strong className="text-purple-300">Button:</strong>
          <p className="text-xs text-gray-400 mt-1">
            Size, weight, radius, padding, shadow, hover effects
          </p>
        </div>
        <div className="p-3 bg-slate-700/50 rounded-lg border border-purple-500/20">
          <strong className="text-purple-300">Input:</strong>
          <p className="text-xs text-gray-400 mt-1">
            Font size, borders, padding, focus states, placeholder
          </p>
        </div>
        <div className="p-3 bg-slate-700/50 rounded-lg border border-indigo-500/20">
          <strong className="text-indigo-300">Card:</strong>
          <p className="text-xs text-gray-400 mt-1">
            Padding, radius, shadows, borders
          </p>
        </div>
        <div className="p-3 bg-slate-700/50 rounded-lg border border-indigo-500/20">
          <strong className="text-indigo-300">Tabs:</strong>
          <p className="text-xs text-gray-400 mt-1">Variant, size, animation</p>
        </div>
        <div className="p-3 bg-slate-700/50 rounded-lg border border-blue-500/20">
          <strong className="text-blue-300">Pagination:</strong>
          <p className="text-xs text-gray-400 mt-1">Button size, shape</p>
        </div>
        <div className="p-3 bg-slate-700/50 rounded-lg border border-blue-500/20">
          <strong className="text-blue-300">Dialog:</strong>
          <p className="text-xs text-gray-400 mt-1">
            Border radius, backdrop opacity
          </p>
        </div>
      </div>
    </div>
  );
};

export default Customisation;
