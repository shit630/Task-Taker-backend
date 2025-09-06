require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");
const TaskRouter = require("./routes/tasks.route");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect database
connectDB();

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" });
});

//route
app.use("/api/tasks", TaskRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
