const express = require("express");
const app = express();

const books = [
  { id: 1, name: "The Journey Not Traveled", author: "Scott Moore" },
  { id: 2, name: "Eclipse", author: "Samantha D. Avery" }
];

app.get("/", (req, res) => {
  res.send(books);
});

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}`));
