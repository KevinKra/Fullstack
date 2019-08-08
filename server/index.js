const express = require("express");
const Joi = require("@hapi/joi");
require("./services/passport");

const app = express();
require("./routes/authRoutes")(app);

app.use(express.json());

// const books = [
//   { id: 1, name: "The Journey Not Traveled", author: "Scott Moore" },
//   { id: 2, name: "NightRunner", author: "Samantha D. Avery" }
// ];

// app.get("/", (req, res) => {
//   res.send(books);
// });

// app.get("/api/books", (req, res) => {
//   res.send(books);
// });

// app.post("/api/books", (req, res) => {
//   //validate input
//   const schema = {
//     name: Joi.string()
//       .min(2)
//       .max(15)
//       .required(),
//     author: Joi.string().required()
//   };
//   const { error } = Joi.validate(req.body, schema);
//   if (error) return res.status(400).send(error.details[0].message);
//   //add book
//   const newBook = {
//     id: books.length + 1,
//     name: req.body.name,
//     author: req.body.author
//   };
//   books.push(newBook);
//   //return data
//   res.send(newBook);
//   //return updated book
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Listening on port ${PORT}`));
