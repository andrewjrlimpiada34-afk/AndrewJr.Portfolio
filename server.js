const express = require("express");
const path = require("path");
const app = express();

// Middleware to serve static files from build folder
app.use(express.static(path.join(__dirname, "build")));

// Health check endpoint (optional)
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Catch-all route: Serve index.html for all non-API routes
// This allows React Router to handle all routing on the client side
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Visit http://localhost:${PORT} to view your portfolio`);
});
