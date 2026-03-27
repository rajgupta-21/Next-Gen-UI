const Sidebardocs = () => {
  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 border border-purple-500/30 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400"></span>
          On this page
        </h3>
        <ul className="space-y-3">
          <li>
            <a
              href="#about"
              className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
            >
              About NewGen UI
            </a>
          </li>
          <li>
            <a
              href="#installation"
              className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
            >
              Installation
            </a>
          </li>
          <li>
            <a
              href="#usage"
              className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
            >
              Usage
            </a>
          </li>
          <li>
            <a
              href="#compatibility"
              className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
            >
              Compatibility
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebardocs;
