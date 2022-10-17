//This component will have a list of final transactions for users once the finalsplit button is clicked
import { createTotalArray, split } from "../utils/helpers.mjs";
import { QUERY_SINGLE_TRIP } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";

function FinalSplit(props) {
  const { data } = useQuery(QUERY_SINGLE_TRIP, {
    variables: { tripId: props.tripId },
  });
  console.log(data);

  const totalPaid = createTotalArray(data.trip.users, data.trip.expensesPaid);
  // console.log(totalPaid);
  //total paid is working, split is return undefined for some reason?
  const output = split(totalPaid);
  console.log(output);

  // console.log(data);

  return (
    // need to run the algorithm
    // with output from algorithm, map over and render list items based on output
    <div className="w-50 mx-auto">
      <h3 className="p-2 m-2">Final Trip $plit:</h3>
      <div className="d-flex flex-column align-items-center">
        <ul className="list-group m-3 d-flex justify-content-center">
          {output &&
            output.map((transaction) => (
              <li className="list-group-item fs-3">
                {transaction.owedFrom} owes {transaction.owedTo}{" "}
                <span className="text-success">{transaction.amount}</span>.
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default FinalSplit;

// {
//   newArray &&
//     newArray.map((expense) => (
//       <div>
//         <li key={Math.random()} className="list-group-item">
//           Someone purchased {expense.itemDescription} for ${expense.amount}
//         </li>
//       </div>
//     ));
// }
