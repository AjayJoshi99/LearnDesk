import React, { useEffect, useState, useCallback } from "react";
import { Sparkles, RefreshCcw } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const QuoteOfTheDay = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0]; 

    const fetchQuote = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/quotes/today`);
      const data = await res.json();

      if (data && data.date === today) {
        setQuote(data.quote);
        setAuthor(data.author);
      } else {
        const newQuoteRes = await fetch(`${process.env.REACT_APP_API_URL}/api/quotes/random`);
        const newQuoteData = await newQuoteRes.json();

        const newQuote = {
          date: today,
          quote: newQuoteData.content || "Stay positive and keep learning!",
          author: newQuoteData.author || "Ajay",
        };

        await fetch(`${process.env.REACT_APP_API_URL}/api/quotes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newQuote),
        });

        setQuote(newQuote.quote);
        setAuthor(newQuote.author);
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      setLoading(false);
    }
  }, [today]);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body text-center">
          <Sparkles size={32} className="mb-3 text-warning" />
          <h4 className="fw-bold text-primary">Quote of the Day</h4>
          {loading ? (
            <p className="text-muted mt-3">Loading...</p>
          ) : (
            <>
              <blockquote className="blockquote mt-3">
                <p className="fst-italic fs-5">“{quote}”</p>
              </blockquote>
              <footer className="blockquote-footer">
                {author || "Unknown"}
              </footer>
            </>
          )}
          <button
            className="btn btn-outline-secondary btn-sm mt-3"
            onClick={fetchQuote}
          >
            <RefreshCcw size={16} className="me-1" /> Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteOfTheDay;
