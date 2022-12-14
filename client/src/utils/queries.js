import { gql } from "@apollo/client";

export const QUERY_TRIPS = gql`
  query trips {
    trips {
      _id
      name
    }
  }
`;

export const QUERY_SINGLE_TRIP = gql`
  query trip($tripId: ID!) {
    trip(tripId: $tripId) {
      name
      _id
      users {
        email
        _id
        firstName
        lastName
      }
      expensesPaid {
        _id
        email
        itemDescription
        amount
      }
    }
  }
`;
//query a trip by name instead of id
export const QUERY_TRIP = gql`
  query findTripByName($name: String!, $password: String) {
    findTripByName(name: $name, password: $password) {
      _id
    }
  }
`;

//used to access all the trips the user is in to display their trips
export const QUERY_USER_TRIPS = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      email
      firstName
      lastName
      trips {
        _id
        name
      }
    }
  }
`;
