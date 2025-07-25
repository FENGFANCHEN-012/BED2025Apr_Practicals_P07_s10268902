const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Get all books
/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: List of books
 */
router.get("/", bookController.getAllBooks);

// Update book availability
/**
 * @swagger
 * /api/books/{id}/availability:
 *   put:
 *     summary: Update book availability
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: body
 *         name: available
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Success message
 *       404:
 *         description: Book not found
 */
router.put("/:book_id/availability", bookController.updateBookAvailability);

module.exports = router;
