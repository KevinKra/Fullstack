//Creating a model class
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

//map the schema to the mongoDB collection "users"
mongoose.model("users", userSchema);
