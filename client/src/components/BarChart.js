import { Bar } from "react-chartjs-2";
import { createTotalArray } from "../utils/helpers";

function BarChart({ chartData, tripData }) {
  let labels = [];
  let dataArr = [];
  const totalArr = createTotalArray(tripData.users, tripData.expensesPaid);

  for (const data of totalArr) {
    labels.push(data.firstName);
    dataArr.push(data.paid);
  }

  const graphData = {
    labels: labels,
    datasets: [
      {
        label: "Trip Expense Status by User",
        data: dataArr,
        backgroundColor: ["#ffbb11"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Bar
        data={graphData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: false,
            },

            legend: {
              display: true,
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
}

export default BarChart;
