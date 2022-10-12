import { gql } from "apollo/client";

export const ADD_EXPENSE = gql`
mutation addExpense($cost: Float!, $description: String!, $purchaser: String!) {
    addExpense(cost: $cost, description: $description, $purchaser: purchaser) {
        cost
        description
        purchaser
        user {
            _id
            name
        }
    }
}`;

export const UPDATE_EXPENSE = gql``;

export const DELETE_EXPENSE = gql``;
