const express = require("express");

const app = express();

// Middleware MUST come before routes
app.use(express.json());

const seatRoutes = require("./routes/seat.routes");
app.use("/api", seatRoutes);
//This means: /lock-seat becomes /api/lock-seat
//All routes from seatRoutes are now available under /api

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

module.exports = app;
