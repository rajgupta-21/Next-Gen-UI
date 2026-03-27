import Link from "next/link";

const FeatureBoxPreview = () => {
  return (
    <section id="feature-box" className="scroll-mt-24">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/30 backdrop-blur-sm hover:border-purple-400/60 transition-all">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Feature Box
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Feature highlight component with icon
            </p>
          </div>
          <Link
            href="/preview/feature-box"
            className="text-sm px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all"
          >
            Open Preview
          </Link>
        </div>

        <div className="bg-white/10 rounded-xl p-4 border border-purple-500/20 backdrop-blur-sm">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
              Amazing Features
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Build powerful websites with our intuitive drag-and-drop builder
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureBoxPreview;
