const bookController = require("../controllers/bookController");
const Book = require("../models/bookModel");

jest.mock("../models/bookModel");

describe("Book Controller", () => {
  test("getAllBooks should return list of books", async () => {
    const mockBooks = [{ title: "Book 1" }, { title: "Book 2" }];
    Book.getAllBooks.mockResolvedValue(mockBooks);

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await bookController.getAllBooks(req, res);

    expect(res.json).toHaveBeenCalledWith(mockBooks);
  });

  test("updateBookAvailability should return success message", async () => {
    Book.updateAvailability.mockResolvedValue(true);

    const req = {
      params: { book_id: 1 },
      body: { available: true }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await bookController.updateBookAvailability(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: "Book availability updated" });
  });

  test("updateBookAvailability should return 404 if book not found", async () => {
    Book.updateAvailability.mockResolvedValue(false);

    const req = {
      params: { book_id: 99 },
      body: { available: false }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await bookController.updateBookAvailability(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Book not found");
  });
});
