const express = require("express");
const Joi = require("@hapi/joi");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");
const app = express();

app.use(express.json());

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      console.log("profile", profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

app.get("/auth/google/callback", passport.authenticate("google"));

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
