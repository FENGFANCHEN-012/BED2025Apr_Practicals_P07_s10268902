require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const verifyJWT = require("./middlewares/authMiddleware");

const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/", authRoutes);
app.use("/books", verifyJWT, bookRoutes);









///////////////

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root
app.get("/", (req, res) => {
  res.send("Welcome to the Polytechnic Library API!");
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));