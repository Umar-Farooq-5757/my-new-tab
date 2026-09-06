import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

interface SearchEngine {
  name: string;
  url: string;
}

const searchEngines: SearchEngine[] = [
  { name: "Google", url: "https://www.google.com/search" },
  { name: "DuckDuckGo", url: "https://duckduckgo.com/" },
  { name: "Bing", url: "https://www.bing.com/search" },
  { name: "Brave", url: "https://search.brave.com/search" },
];

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [engineIndex, setEngineIndex] = useState<number>(() => {
    const saved = localStorage.getItem("currentEngine");
    return saved ? JSON.parse(saved) : 0;
  });
  const currentEngine = searchEngines[engineIndex];

  const changeSearchEngine = () => {
    localStorage.setItem(
      "currentEngine",
      JSON.stringify((engineIndex + 1) % searchEngines.length),
    );
    setEngineIndex((prevIndex) => (prevIndex + 1) % searchEngines.length);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const isUrl =
      /^https?:\/\//i.test(query) ||
      (query.includes(".") && !query.includes(" "));

    if (isUrl) {
      e.preventDefault();
      const destination = query.startsWith("http") ? query : `https://${query}`;
      window.open(destination, "_blank", "noopener,noreferrer");
      setQuery("");
    }
  };

  return (
    <form
      action={currentEngine.url}
      method="GET"
      target="_blank"
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-xl mx-auto px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg transition-all">
      <div
        onClick={changeSearchEngine}
        className="text-white bg-white/15 px-3 py-1 rounded-full cursor-pointer hover:opacity-80">
        {currentEngine.name}
      </div>
      <input
        type="text"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search or type a URL..."
        autoComplete="off"
        autoFocus
        required
        className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/60 px-2 text-base"
      />
      <button
        type="submit"
        className="p-2 text-white/80 hover:bg-gray-800 rounded-full transition-colors"
        aria-label="Search">
        <IoIosSearch className="size-5" />
      </button>
    </form>
  );
};

export default Search;
