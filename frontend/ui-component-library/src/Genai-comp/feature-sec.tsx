import { Arrayfeaturesection } from "@/const/page";
const Featuresec = () => {
  return (
    <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Arrayfeaturesection.map((feature, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-purple-500/30 backdrop-blur-sm hover:border-purple-400/60 transition-all group"
        >
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
            {feature.icon}
          </div>
          <h3 className="font-bold text-white mb-2">{feature.title}</h3>
          <p className="text-gray-400 text-sm">{feature.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Featuresec;
