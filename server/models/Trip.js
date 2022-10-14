const { Schema, model } = require("mongoose");
const { totalPaidSchema, expensePaidSchema } = require("./Payment");

const bcrypt = require("bcrypt");

//Trip -
const tripSchema = new Schema({
  // Id
  // Name
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // Password
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  // Array of users
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // Array of objects total paid for each user [{user id, amount paid}, {user id, amount paid}]
  totalPaid: [totalPaidSchema],
  // Array of objects expenses paid [{user id, item description, amount},...]
  expensesPaid: [
    expensePaidSchema,
    // {
    //   type: Schema.Types.ObjectId,
    //   ref: "expensePaidSchema",
    // },
  ],
});

tripSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

tripSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Trip = model("Trip", tripSchema);

module.exports = Trip;
