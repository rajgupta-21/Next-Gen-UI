import Link from "next/link";

const StatsPreview = () => {
  return (
    <section id="stats" className="scroll-mt-24">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/30 backdrop-blur-sm hover:border-purple-400/60 transition-all">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Stats Display
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Display key metrics and statistics
            </p>
          </div>
          <Link
            href="/preview/stats"
            className="text-sm px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all"
          >
            Open Preview
          </Link>
        </div>

        <div className="bg-white/10 rounded-xl p-4 border border-purple-500/20 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                150K
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Happy Users
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                98%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Satisfaction
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                50M+
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Components Built
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsPreview;
