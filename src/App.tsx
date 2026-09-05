import { useEffect, useState } from "react";
import "./App.css";
import { Search } from "./components/Search";

function App() {
  const [bgImage, setBgImage] = useState("");
  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
      );
      const data = await res.json();
      if (data.media_type === "image") {
        setBgImage(data.url);
      }
    };
    fetchImage();
  }, []);
  return (
    <main
    className="flex items-center justify-center"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}>
      <Search />
    </main>
  );
}

export default App;
