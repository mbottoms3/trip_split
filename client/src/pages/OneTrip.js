import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ExpenseForm from "../components/ExpenseForm";
import Feed from "../components/Feed";

function OneTrip() {
  //   const { tripId } = useParams();
  //   const { loading, data } = useQuery(QUERY_SINGLE_TRIP, {
  //     variables: { tripId: tripId },
  //   });

  //   const trip = data?.trip || {};

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }
  return (
    <div>
      <ExpenseForm />
      <Feed />
    </div>
  );
}

export default OneTrip;
