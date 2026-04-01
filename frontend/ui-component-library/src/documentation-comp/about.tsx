const About = () => {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/30 backdrop-blur-sm">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
          About NewGen UI
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          NewGen UI is a lightweight and versatile component library built for
          modern web applications. It's designed to be easily themed and
          customized, allowing you to build beautiful and consistent user
          interfaces with minimal effort.
        </p>
        <p className="text-gray-300 mb-6 leading-relaxed">
          New for this release: the Website Builder includes a real-time Netlify
          deployment workflow. Build visually, then deploy instantly with a
          token so your UI is live in seconds.
        </p>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white text-2xl shadow-lg">
              N
            </div>
            <div className="text-sm text-gray-400">Next.js</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white text-2xl shadow-lg">
              TS
            </div>
            <div className="text-sm text-gray-400">TypeScript</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
