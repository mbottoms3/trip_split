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
      return Trip.findOne({ _id: tripId })
        .populate("users")
        .populate("expensesPaid");
    },
    //find Trip by name
    findTripByName: async (parent, { name, password }) => {
      const trip = await Trip.findOne({ name: name }).populate("users");
      const correctPw = await trip.isCorrectPassword(password);

      if (!correctPw || !trip) {
        console.log("didn't work");
        throw new AuthenticationError("Trip does not exist.");
      } else {
        return trip;
      }
    },
    // find all trips
    trips: async (parent, args) => {
      // const params = email ? { email } : {};
      return Trip.find();
    },

    // findTripExpense: async (parent, { tripId }) => {
    //   return Trip.findOne({ _id: tripId }).populate("users", "expensesPaid");
    // },
  },

  Mutation: {
    // ADD user
    addUser: async (parent, { email, password, firstName, lastName }) => {
      const user = await User.create({ email, password, firstName, lastName });
      const token = signToken(user);
      return { token, user };
    },

    // Add a trip
    addTrip: async (parent, { name, password }) => {
      return Trip.create({ name, password });
    },

    // ADD user to a trip
    addUserToTrip: async (parent, { userId, tripId }) => {
      return Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $addToSet: { users: { _id: userId } },
        },
        { new: true }
      );
    },

    // ADD trip to a user
    addTripToUser: async (parent, { tripId, userId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { trips: { _id: tripId } },
        },
        { new: true }
      );
    },

    // ADD an expense to array
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

    // DELETE an expense
    removeExpense: async (parent, { tripId, expensePaidId }) => {
      return Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $pull: { expensesPaid: { _id: expensePaidId } },
        },
        { new: true }
      );
    },

    // LOGIN
    login: async (parent, { email, password }) => {
      console.log("inside login in resolvers");
      const user = await User.findOne({ email });
      console.log(user);
      const correctPw = await user.isCorrectPassword(password);
      console.log(correctPw);
      if (!correctPw || !user) {
        console.log("didn't work");
        throw new AuthenticationError("Incorrect email or password.");
      }

      const token = signToken(user);
      return { token, user };
    },

    // UPDATE an expense(icebox)
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
