import Link from "next/link";

const FooterPreview = () => {
  return (
    <section id="footer" className="scroll-mt-24">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/30 backdrop-blur-sm hover:border-purple-400/60 transition-all">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Footer
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Footer section for your website
            </p>
          </div>
          <Link
            href="/preview/footer"
            className="text-sm px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all"
          >
            Open Preview
          </Link>
        </div>

        <div className="bg-white/10 rounded-xl p-4 border border-purple-500/20 backdrop-blur-sm">
          <footer className="bg-gray-900 text-white p-8 rounded-lg text-center">
            <p className="mb-2">© 2024 Your Company. All rights reserved.</p>
            <p className="text-sm text-gray-400">
              Built with NewGen UI Component Library
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default FooterPreview;
