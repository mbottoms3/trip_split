const { Schema } = require("mongoose");

//will be referenced as an array of objects in trip model
const totalPaidSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  email: {
    type: String,
    match: [
      /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      "Must be a valid email address.",
    ],
  },
  amountPaid: {
    type: Number,
  },
});

//will be referenced as an array od objects in trip model
const expensePaidSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  email: {
    type: String,
    match: [
      /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      "Must be a valid email address.",
    ],
  },
  itemDescription: {
    type: String,
    required: true,
    maxLength: 100,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = { totalPaidSchema, expensePaidSchema };
