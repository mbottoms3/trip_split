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
