import { Bar } from "react-chartjs-2";

function BarChart({ chartData }) {
  return (
    <div>
      <Bar
        data={chartData}
        options={{
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
