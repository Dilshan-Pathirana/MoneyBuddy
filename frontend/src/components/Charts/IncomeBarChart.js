import React from "react";
import { Bar } from "react-chartjs-2";

function IncomeBarChart({ data }) {
  const income = data.filter(t => t.type === "income");
  const grouped = {};
  income.forEach(t => {
    grouped[t.category] = (grouped[t.category] || 0) + parseFloat(t.amount);
  });

  return (
    <Bar
      data={{
        labels: Object.keys(grouped),
        datasets: [
          {
            label: "Income (LKR)",
            data: Object.values(grouped),
          }
        ]
      }}
    />
  );
}

export default IncomeBarChart;
