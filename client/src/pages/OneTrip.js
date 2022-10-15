import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "chart.js/auto";
import { QUERY_SINGLE_TRIP } from "../utils/queries";

import ExpenseForm from "../components/ExpenseForm";
import Feed from "../components/Feed";
import BarChart from "../components/BarChart";

function OneTrip() {
  const graphData = {
    // labels: ["User 1", "User 2", "User 3"],
    datasets: [
      {
        label: "Trip Expense Status by User",
        // data: [150, 55, 63],
        backgroundColor: ["#ffbb11", "#ffbb11", "#ffbb11"],
        borderWidth: 1,
      },
    ],
  };
  const [chartData, setChartData] = useState(graphData);
  //grabs the trip id from the state on the link before
  const location = useLocation();
  const { tripId } = location.state;

  //fetch this trip's data from the database
  const { loading, data } = useQuery(QUERY_SINGLE_TRIP, {
    variables: { tripId: tripId },
  });

  const trip = data?.trip || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  function createColorsArray(numbersArray) {
    const colorsArray = [];
    //create number that is average
    //map through array and change number to color based on comparison to average
  }

  // function handleClick(e) {
  //   setChartData(graphData);
  // }

  // function handleSplit(e) {
  //   e.preventDefault();
  //   console.log("clicked");
  //   window.location.replace("/finaltripsplit");
  // }
  return (
    <div>
      <h2 className="my-3">{trip.name}</h2>
      <div className="d-flex justify-content-between">
        <div className="">
          <ExpenseForm
            tripId={trip._id}
            expenses={trip.expensesPaid}
            users={trip.users}
            title="Trip Feed:"
          />
        </div>
        <div className="w-50">
          <h3 className="my-3">Trip Expense Status by User</h3>
          <BarChart chartData={chartData} tripData={trip} />
          <Link
            className="btn btn-primary"
            to="/finaltripsplit"
            state={{ expenses: trip.expensesPaid, users: trip.users }}
          >
            Final Trip $plit
          </Link>
        </div>
      </div>
      {/* <Feed  /> */}
    </div>
  );
}

export default OneTrip;
