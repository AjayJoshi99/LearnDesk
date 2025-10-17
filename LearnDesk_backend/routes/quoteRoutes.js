const express = require("express");
const router = express.Router();
const Quote = require("../models/Quote");

router.get("/today", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const quote = await Quote.findOne({ date: today });
    res.json(quote);
  } catch (err) {
    console.error("Error in /today:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { date, quote, author } = req.body;
    console.log("Storing new quote:", req.body);

    await Quote.deleteMany({ date: { $ne: date } });
    const newQuote = await Quote.create({ date, quote, author });
    res.json(newQuote);
  } catch (err) {
    console.error("Error in POST /api/quotes:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/random", async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    if (!response.ok) {
      throw new Error(`Failed to fetch quote: ${response.statusText}`);
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0 && data[0].q && data[0].a) {
      const quote = {
        content: data[0].q,
        author: data[0].a,
      };
      return res.json(quote);
    } else {
      throw new Error("Invalid quote data received");
    }
  } catch (error) {
    console.error("Error in /random route:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
