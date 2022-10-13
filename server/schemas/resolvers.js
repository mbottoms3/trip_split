const { User, Trip, expensePaidSchema } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // find Users
    users: async () => {
      return User.find().populate("trips");
    },
    // findOne User
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate("trips");
    },
    // find Trip
    trip: async (parent, { tripId }) => {
      return Trip.findOne({ _id: tripId }).populate("users");
    },
    // find all trips
    trips: async (parent, args) => {
      // const params = email ? { email } : {};
      return Trip.find();
    },
  },

  Mutation: {
    addTrip: async (parent, { name, password }) => {
      return Trip.create({ name, password });
    },

    addExpense: async (parent, { tripId, itemDescription, amount }) => {
      return Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $addToSet: { expensesPaid: { itemDescription, amount } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
  },
};

module.exports = resolvers;
