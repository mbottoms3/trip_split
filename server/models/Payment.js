const { Schema } = require("mongoose");

//will be referenced as an array of objects in trip model
const totalPaidSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
