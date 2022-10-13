import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "chart.js/auto";

import ExpenseForm from "../components/ExpenseForm";
import Feed from "../components/Feed";
import BarChart from "../components/BarChart";

function OneTrip() {
  //grabs the trip id from the state on the link before
  const location = useLocation();
  const { tripId } = location.state;
  console.log(tripId);

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

  function handleClick(e) {
    setChartData(graphData);
  }
  const graphData = {
    labels: ["User 1", "User 2", "User 3"],
    datasets: [
      {
        label: "Trip Expense Status by User",
        data: [150, 55, 63],
        backgroundColor: ["#ffbb11", "#ffbb11", "#ffbb11"],
        borderWidth: 1,
      },
    ],
  };
  const [chartData, setChartData] = useState(graphData);
  return (
    <div>
      <h2 className="my-3">Insert title of trip prop here</h2>
      <div className="d-flex justify-content-between">
        <div className="">
          <ExpenseForm />
        </div>
        <div className="w-50">
          <h3 className="my-3">Trip Expense Status by User</h3>
          <BarChart chartData={chartData} />
        </div>
      </div>
      <Feed />
      <button className="btn" onClick={handleClick}>
        Button
      </button>
    </div>
  );
}

export default OneTrip;
