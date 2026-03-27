import CodeSnippet from "@/components/CodeSnippet";
const Usage = () => {
  return (
    <section id="usage" className="scroll-mt-24">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/30 backdrop-blur-sm">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
          Usage
        </h2>
        <p className="text-gray-300 mb-6">
          Import the components you need and start building. Here's a simple
          example of how to use the{" "}
          <span className="bg-purple-600/30 px-2 py-1 rounded text-purple-300">
            Button
          </span>{" "}
          component.
        </p>
        <CodeSnippet language="tsx">
          {`import { Button } from '@your-scope/newgen-ui';

export default function MyComponent() {
  return (
    <Button 
      variant="gradient" 
      onClick={() => alert('Button clicked!')}
    >
      Click Me
    </Button>
  );
}`}
        </CodeSnippet>
      </div>
    </section>
  );
};

export default Usage;
