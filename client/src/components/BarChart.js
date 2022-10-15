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
        backgroundColor: ["#3e2f34"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="bar-chart p-3">
      <Bar
        data={graphData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: false,
            },

            legend: {
              display: false,
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
}

export default BarChart;
