import Link from "next/link";

const CTAPreview = () => {
  return (
    <section id="cta" className="scroll-mt-24">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/30 backdrop-blur-sm hover:border-purple-400/60 transition-all">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Call to Action
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              CTA section component for conversions
            </p>
          </div>
          <Link
            href="/preview/cta"
            className="text-sm px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all"
          >
            Open Preview
          </Link>
        </div>

        <div className="bg-white/10 rounded-xl p-4 border border-purple-500/20 backdrop-blur-sm">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-lg text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Ready to Get Started?</h2>
            <p className="mb-4 opacity-90">
              Join thousands of happy users building amazing websites
            </p>
            <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAPreview;
