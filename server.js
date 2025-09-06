require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");
const TaskRouter = require("./routes/tasks.route");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed origins (local + production)
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://task-taker-iota.vercel.app", // Deployed frontend on Vercel
];

// ✅ CORS setup
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect database
connectDB();

// ✅ Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" });
});

// ✅ Routes
app.use("/api/tasks", TaskRouter);

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
