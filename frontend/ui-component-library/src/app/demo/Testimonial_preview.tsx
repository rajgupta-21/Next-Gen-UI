import Link from "next/link";

const TestimonialPreview = () => {
  return (
    <section id="testimonial" className="scroll-mt-24">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/30 backdrop-blur-sm hover:border-purple-400/60 transition-all">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Testimonial
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Customer testimonial card component
            </p>
          </div>
          <Link
            href="/preview/testimonial"
            className="text-sm px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all"
          >
            Open Preview
          </Link>
        </div>

        <div className="bg-white/10 rounded-xl p-4 border border-purple-500/20 backdrop-blur-sm">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
            <p className="text-gray-700 dark:text-gray-300 italic mb-4">
              "This product has completely transformed how we manage our projects.
              Highly recommend!"
            </p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              Sarah Johnson
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Product Manager at Tech Corp
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialPreview;
