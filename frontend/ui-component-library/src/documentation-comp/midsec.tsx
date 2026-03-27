import About from "./about";
import Compatibility from "./compatibility";
import Installation from "./installation";
import Sidebardocs from "./sidebar";
import Usage from "./usage";

const Midsec = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Sidebar */}
      <Sidebardocs />

      <main className="lg:col-span-2 space-y-8">
        {/* About Section */}
        <About />

        {/* Installation Section */}
        <Installation />

        {/* Usage Section */}
        <Usage />

        {/* Compatibility Section */}
        <Compatibility />
      </main>
    </div>
  );
};

export default Midsec;
