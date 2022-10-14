import { gql } from "@apollo/client";

//expense functions
export const ADD_EXPENSE = gql`
  mutation addExpense(
    $tripId: ID!
    $itemDescription: String!
    $amount: Float!
    $email: String!
  ) {
    addExpense(
      tripId: $tripId
      itemDescription: $itemDescription
      amount: $amount
      email: $email
    ) {
      expensesPaid {
        email
        amount
      }
      users {
        firstName
        email
      }
    }
  }
`;

// export const UPDATE_EXPENSE = gql``;

// export const DELETE_EXPENSE = gql``;

//trip mutations
export const ADD_TRIP = gql`
  mutation addTrip($name: String!, $password: String!) {
    addTrip(name: $name, password: $password) {
      name
      password
    }
  }
`;

export const UPDATE_TRIP = gql`
  mutation addUserToTrip($userId: ID!, $tripId: ID!) {
    addUserToTrip(userId: $userId, tripId: $tripId) {
      _id
      name
      users {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation addTripToUser($tripId: ID!, $userId: ID!) {
    addTripToUser(tripId: $tripId, userId: $userId) {
      trips {
        _id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    addUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      _id
      trips {
        _id
      }
    }
  }
`;
