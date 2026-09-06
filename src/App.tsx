import "./App.css";
import Search from "./components/Search";
import TimeAndDate from "./components/TimeAndDate";
import Quote from "./components/Quote";
import Shortcuts from "./components/Shortcuts";
import AmbienceMixer from "./components/AmbienceMixer";

function App() {
  return (
    <main
      className="relative flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(/background2.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0" />
      <div className="relative z-10 w-full flex flex-col items-center justify-center p-4 gap-6">
        <div className="text-white flex justify-between fixed top-4 left-4 right-4">
          <TimeAndDate />
          <Quote />
        </div>
        <Search />
        <Shortcuts />
        <div className="text-white flex justify-between fixed bottom-4 left-4 right-4">
          <AmbienceMixer/>
        </div>
      </div>
    </main>
  );
}

export default App;
