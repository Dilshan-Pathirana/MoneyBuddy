import React from "react";
import { Line } from "react-chartjs-2";

function TrendLineChart({ data }) {
  const daily = {};
  data.forEach(t => {
    daily[t.date] = (daily[t.date] || 0) + (t.type === "income" ? parseFloat(t.amount) : -parseFloat(t.amount));
  });

  const dates = Object.keys(daily).sort();

  return (
    <Line
      data={{
        labels: dates,
        datasets: [
          {
            label: "Net Change (LKR)",
            data: dates.map(d => daily[d]),
          }
        ]
      }}
    />
  );
}

export default TrendLineChart;
