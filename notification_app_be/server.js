const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "Backend Running"
  });
});

app.post("/logs", (req, res) => {
  const { stack, level, package: packageName, message } = req.body;

  if (!stack || !level || !packageName || !message) {
    return res.status(400).json({
      error: "Missing required log fields: stack, level, package, message"
    });
  }

  console.log("Received log:", {
    stack,
    level,
    package: packageName,
    message
  });

  res.json({
    status: "ok",
    received: { stack, level, package: packageName, message }
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});