import { Infosecarray } from "@/const/page";
export const Infosec = () => {
  return (
    <div className="mt-16 md:mt-20 bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Infosecarray.map((step) => (
          <div key={step.num} className="relative">
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 h-full">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-900 dark:bg-gray-100 rounded-full mb-4 font-bold text-white dark:text-gray-900 text-lg">
                {step.num}
              </div>
              <div className="text-2xl mb-3">{step.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
