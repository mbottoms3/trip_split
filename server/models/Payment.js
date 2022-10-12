const { Schema } = require("mongoose");

//will be referenced as an array in trip model
const totalPaidSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  amountPaid: {
    type: Number,
  },
});

module.exports = { totalPaidSchema };
