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
    totalPaid: [{User}, {Number}]!
    expensesPaid: [{User}, {String}, {Number}]!
}

type Query {
    users: [User]
    user(email: String!): User
}

type Mutation {
    
}









`;

module.exports = typeDefs;
