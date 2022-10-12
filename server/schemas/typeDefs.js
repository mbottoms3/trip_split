const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    password: String
    firstName: String
    lastName: String
    trips: [Trip]!
  }

  type Trip {
    _id: ID
    name: String
    password: String
    users: [User]!
  }

  type totalPaid {
    user: [User]
    amountPaid: Int
  }

  type expensePaid {
    user: [User]
    itemDescription: String
    amount: Int
  }

  type Query {
    users: [User]
    user(email: String!): User
    trip(tripId: ID!): Trip
    trips(email: String!): Trip
    #GET all expenses
  }

  type Mutation {
    #addUser(email: String!, password: String!, firstName: String!, lastName: String!): Auth
    #login(email: String!, password: String!): Auth
    addTrip(name: String!, password: String!): Trip
    #ADD expense
    #UPDATE expense by ID
    #UPDATE trip by id to add user
    #DELETE expense by id
  }
`;

module.exports = typeDefs;
