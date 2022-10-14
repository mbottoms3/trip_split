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
    // find Trip by id
    trip: async (parent, { tripId }) => {
      return Trip.findOne({ _id: tripId }).populate("users");
    },
    //find Trip by name
    findTripByName: async (parent, { name }) => {
      return Trip.findOne({ name: name }).populate("users");
    },
    // find all trips
    trips: async (parent, args) => {
      // const params = email ? { email } : {};
      return Trip.find();
    },
  },

  Mutation: {
    // addUserToTrip: async (parent, { tripId, user }) => {
    //   return Trip.findOneAndUpdate(
    //     { _id: tripId },
    //     {
    //       $addToSet: { users: user },
    //     },
    //     { new: true, runValidators: true }
    //   );
    // },

    addUser: async (parent, { email, password, firstName, lastName }) => {
      return User.create({ email, password, firstName, lastName });
    },

    addUserToTrip: async (parent, { userId, tripId }) => {
      return Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $addToSet: { users: { _id: userId } },
        },
        { new: true }
      );
    },

    addTripToUser: async (parent, { tripId, userId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { trips: { _id: tripId } },
        },
        { new: true }
      );
    },

    addTrip: async (parent, { name, password }) => {
      return Trip.create({ name, password });
    },

    addExpense: async (parent, { tripId, itemDescription, amount, email }) => {
      return Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $addToSet: { expensesPaid: { itemDescription, amount, email } },
          // $addToSet: { totalPaid: { email, amount } },
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

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw || !user) {
        throw new AuthenticationError("Incorrect email or password.");
      }

      const token = signToken(user);
      return { token, user };
    },
    // updateExpense: async (
    //   parent,
    //   { tripId, expensePaidId, itemDescription, amount }
    // ) => {
    //   return Trip.findOneAndUpdate(
    //     { _id: tripId },
    //     {
    //       $set: {
    //         expensesPaid: {
    //           _id: expensePaidId,
    //           itemDescription: itemDescription,
    //           amount: amount,
    //         },
    //       },
    //     },
    //     { new: true }
    //   );
    // },
  },
};

module.exports = resolvers;

// { trip.expensesPaid }
