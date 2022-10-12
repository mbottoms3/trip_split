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

#These need to be finished
type Query {
    users: [User]
    user(email: String!): User
    trip(tripId: ID!): Trip

}

type Mutation {
    addUser(email: String!, password: String!, firstName: String!, lastName: String!): Auth
    login(email: String!, password: String!): Auth
    addTrip(name: String!, password: String!): Trip
}









`;

module.exports = typeDefs;
