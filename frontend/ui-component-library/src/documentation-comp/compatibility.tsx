import Link from "next/link";
const Compatibility = () => {
  return (
    <section id="compatibility" className="scroll-mt-24">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/30 backdrop-blur-sm">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-6">
          Compatibility
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-slate-700/50 to-purple-700/20 rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-bold text-white mb-2">Frameworks</h3>
            <p className="text-sm text-gray-400 mb-4">
              Works with the most popular React frameworks.
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Next.js (App & Pages Router)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Vite + React</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Create React App</span>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-700/50 to-indigo-700/20 rounded-xl p-6 border border-indigo-500/30">
            <h3 className="text-lg font-bold text-white mb-2">
              Component Access
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Two convenient ways to use components.
            </p>
            <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
              <li>
                Copy code from{" "}
                <Link
                  href="/preview"
                  className="text-indigo-400 hover:text-indigo-300 underline font-medium"
                >
                  preview pages
                </Link>
                .
              </li>
              <li>Install the npm package for easy imports.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Compatibility;
