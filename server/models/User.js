const { Schema, model } = require("mongoose");

//Will use this later once we add password authentication
//const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      "Must be a valid email address.",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  trips: [
    {
      type: Schema.Types.ObjectId,
      ref: "Trip",
    },
  ],
});

const User = model("User", userSchema);

module.exports = User;
