import { Bar } from "react-chartjs-2";

function BarChart({ chartData, tripData }) {
  var userArr = [];
  var expensesArr = [];
  for (const user of tripData.expensesPaid) {
    userArr.push(user.email);
    expensesArr.push(user.amount);
  }

  const graphData = {
    labels: userArr,
    datasets: [
      {
        label: "Trip Expense Status by User",
        data: expensesArr,
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
