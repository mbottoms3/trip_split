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

}











`;

module.exports = typeDefs;
