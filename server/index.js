const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

const app = express();

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.log("Could not connect to MongoDB", err));
app.use(express.json());

//maxAge: how long a cookie can last before it can expire
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./routes/authRoutes")(app);

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
