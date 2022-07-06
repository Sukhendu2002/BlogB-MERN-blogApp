const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
const connectDB = require("./db");
const errorHandler = require("./middleware/error");
const morgan = require("morgan");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/auth", require("./routes/userRoute"));
app.use("/api/blog", require("./routes/blogRoute"));

//Error Handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  try {
    console.log(`Server started on port ${PORT}`);
    connectDB();
  } catch (err) {
    console.log(err);
  }
});
