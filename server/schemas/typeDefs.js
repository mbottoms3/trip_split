const { gql } = require("apollo-server-express");

//Potentially need to add "Auth" after addUser instead of "User"
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
    expensesPaid: [expensePaid]
  }

  type Auth {
    token: ID!
    user: User
  }
  type totalPaid {
    user: [User]
    amountPaid: Float
  }

  type expensePaid {
    _id: ID
    email: String
    itemDescription: String
    amount: Float
  }

  type Query {
    users: [User]
    user(email: String!): User
    trip(tripId: ID!): Trip
    findTripByName(name: String!): Trip
    trips: [Trip]
    #GET all expenses
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    
    addUser(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
    ): Auth

    addUserToTrip(userId: ID!, tripId: ID!): Trip

    addTripToUser(tripId: ID!, userId: ID!): User

    addTrip(name: String!, password: String!): Trip

    addExpense(
      tripId: ID!
      itemDescription: String!
      amount: Float!
      email: String!
    ): Trip

    removeExpense(tripId: ID!, expensePaidId: ID!): Trip

    updateExpense(
      tripId: ID
      expensePaidId: ID!
      itemDescription: String
      amount: Float
    ): Trip

    #UPDATE trip by id to add user
    #UPDATE expense by ID
  }
`;

module.exports = typeDefs;
