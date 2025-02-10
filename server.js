const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});