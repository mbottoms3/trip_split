const { User, Trip, expensePaidSchema } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { findOneAndUpdate } = require("../models/User");

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

    addExpense: async (parent, { tripId, itemDescription, amount, email }) => {
      return Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $addToSet: { expensesPaid: { itemDescription, amount, email } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    removeExpense: async (parent, { tripId, expensePaidId }) => {
      return Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $pull: { expensesPaid: { _id: expensePaidId } },
        },
        { new: true }
      );
    },

    updateExpense: async (
      parent,
      { expensePaidId, itemDescription, amount }
    ) => {
      return expensePaidSchema.findOneAndUpdate(
        { _id: expensePaidId },
        {
          $set: {
            expensesPaid: {
              itemDescription: itemDescription,
              amount: amount,
            },
          },
        },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;

// { trip.expensesPaid }
