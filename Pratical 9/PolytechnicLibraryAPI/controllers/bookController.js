const Book = require("../models/bookModel");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).send("Error retrieving books");
  }
};

exports.updateBookAvailability = async (req, res) => {
  const { bookId } = req.params;
  const { availability } = req.body;

  try {
    await Book.updateAvailability(bookId, availability);
    res.json({ message: "Book availability updated successfully" });
  } catch (err) {
    res.status(500).send("Error updating book availability");
  }
};
