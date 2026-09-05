import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export const Search: React.FC = () => {
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
      target="_blank"
      onSubmit={handleSubmit}
      className="bg-slate-950 text-white w-1/2 px-4 py-4 rounded-md flex items-center justify-between shadow-2xl">
      <input
        type="text"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Google or type a URL..."
        autoComplete="off"
        autoFocus
        required
        className="grow outline-none"
      />
      <button type="submit" className="" aria-label="Search">
        <IoIosSearch />
      </button>
    </form>
  );
};
