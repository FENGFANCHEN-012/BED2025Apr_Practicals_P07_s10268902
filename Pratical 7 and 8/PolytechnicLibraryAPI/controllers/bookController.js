const express = require("express");
const router = express.Router();
const { getAllBooks, updateBookAvailability } = require("../models/bookModel");

router.get("/", async (req, res) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch books" });
  }
});

router.put("/:bookId/availability", async (req, res) => {
  const { bookId } = req.params;
  const { availability } = req.body;

  if (!["Y", "N"].includes(availability)) {
    return res.status(400).json({ message: "Invalid availability value" });
  }

  try {
    await updateBookAvailability(bookId, availability);
    res.status(200).json({ message: "Availability updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update book" });
  }
});

module.exports = router;
