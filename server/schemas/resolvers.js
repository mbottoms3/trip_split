const { User, Trip } = require("../models");
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
  },

  Mutation: {},
};
