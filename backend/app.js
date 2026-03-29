require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/:path*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.json({ message: "Task Manager API is running" });
  });
}

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
