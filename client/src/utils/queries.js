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
      }
      expensesPaid {
        itemDescription
        amount
      }
    }
  }
`;
