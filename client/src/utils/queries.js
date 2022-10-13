import { gql } from "@apollo/client";

export const QUERY_TRIPS = gql`
  query trips {
    trips {
      _id
      name
    }
  }
`;
