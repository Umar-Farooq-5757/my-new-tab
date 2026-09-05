import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");

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
      action="https://www.google.com/search"
      method="GET"
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-xl mx-auto px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg transition-all">
      <input
        type="text"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Google or type a URL..."
        autoComplete="off"
        autoFocus
        required
        className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/60 px-2 text-base"
      />
      <button
        type="submit"
        className="p-2 text-white/80 hover:bg-gray-800 rounded-full transition-colors"
        aria-label="Search">
        <IoIosSearch />
      </button>
    </form>
  );
};

export default Search;
