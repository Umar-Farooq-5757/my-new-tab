import type React from "react";
import { useEffect, useState } from "react";

const Quote: React.FC = () => {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchQuote = async () => {
      try {
        const res = await fetch("https://dummyjson.com/quotes/random", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setQuote(data.quote);
        setAuthor(data?.author);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setQuote(
            `"Code is like humor. When you have to explain it, it's bad."`,
          );
        }
      } finally {
        // setLoading(false);
      }
    };
    fetchQuote();
    return () => {
      controller.abort();
    };
  }, []);
  setTimeout(() => {
    setLoading(false);
  }, 1500);

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl w-100">
      {loading && (
        <>
          <p className="bg-white/20 backdrop-blur-md w-9/10 h-5 my-2 animate-pulse"></p>
          <p className="bg-white/20 backdrop-blur-md w-9/10 h-5 my-2 animate-pulse"></p>
          <p className="bg-white/20 backdrop-blur-md  w-1/2 h-5 my-2 animate-pulse"></p>
        </>
      )}
      {!loading && (
        <p className="text-white leading-8 wrap-break-word quote">"{quote}" - <span className="text-teal-500 font-semibold">{author}</span></p>
      )}
    </div>
  );
};

export default Quote;
