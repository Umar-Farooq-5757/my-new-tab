import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import TimeAndDate from "./components/TimeAndDate";

function App() {
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY || "DEMO_KEY";
        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
        );
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        if (data.media_type === "image" && data.url) {
          setBgImage(data.url);
        } else {
          console.warn("NASA APOD today is not an image. Using fallback.");
        }
      } catch (error) {
        console.error("Failed to fetch NASA image:", error);
      }
    };
    fetchImage();
  }, []);

  return (
    <main
      className="relative flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : `url(/background.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0" />
      <div className="relative z-10 w-full flex flex-col items-center justify-center p-4 gap-6">
        <div className="text-white flex justify-between w-full fixed top-4 left-4 right-4">
          <TimeAndDate />
          {/* <Weather /> */}
        </div>
        <Search />
      </div>
    </main>
  );
}

export default App;
