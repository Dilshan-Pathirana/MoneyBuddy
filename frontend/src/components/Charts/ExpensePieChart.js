import React from "react";
import { Pie } from "react-chartjs-2";

function ExpensePieChart({ data }) {
  const expenses = data.filter(t => t.type === "expense");
  const grouped = {};
  expenses.forEach(t => {
    grouped[t.category] = (grouped[t.category] || 0) + parseFloat(t.amount);
  });

  return (
    <Pie
      data={{
        labels: Object.keys(grouped),
        datasets: [
          {
            data: Object.values(grouped),
          }
        ]
      }}
    />
  );
}

export default ExpensePieChart;
