import CodeSnippet from "@/components/CodeSnippet";
const Installation = () => {
  return (
    <section id="installation" className="scroll-mt-24">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/30 backdrop-blur-sm">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
          Installation
        </h2>
        <p className="text-gray-300 mb-6">
          To get started, install the package from npm or your favorite package
          manager.
        </p>
        <CodeSnippet language="bash">
          {`npm install @your-scope/newgen-ui
# or
yarn add @your-scope/newgen-ui`}
        </CodeSnippet>
      </div>
    </section>
  );
};

export default Installation;
