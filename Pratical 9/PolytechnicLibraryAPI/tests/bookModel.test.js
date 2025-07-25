const Book = require("../models/bookModel");
const db = require("../db");

jest.mock("../db");

describe("Book Model", () => {
  test("getAllBooks should return list of books from DB", async () => {
    const mockData = { recordset: [{ title: "Book 1" }] };
    db.query.mockResolvedValue(mockData);

    const result = await Book.getAllBooks();
    expect(result).toEqual([{ title: "Book 1" }]);
  });

  test("updateAvailability should return true if updated", async () => {
    db.query.mockResolvedValue({ rowsAffected: [1] });

    const result = await Book.updateAvailability(1, true);
    expect(result).toBe(true);
  });

  test("updateAvailability should return false if nothing updated", async () => {
    db.query.mockResolvedValue({ rowsAffected: [0] });

    const result = await Book.updateAvailability(99, false);
    expect(result).toBe(false);
  });
});
