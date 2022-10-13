import { gql } from "@apollo/client";

//expense functions
export const ADD_EXPENSE = gql`
  mutation addExpense(
    $cost: Float!
    $description: String!
    $purchaser: String!
  ) {
    addExpense(amount: $cost, itemDescription: $description, user: $purchaser) {
      cost
      description
      purchaser
      user {
        _id
        expenses
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
