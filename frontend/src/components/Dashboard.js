import React, { useEffect, useState } from "react";
import {
  getTransactions,
  createTransaction,
  aiSuggest
} from "../services/api";

import ExpensePieChart from "./Charts/ExpensePieChart";
import IncomeBarChart from "./Charts/IncomeBarChart";
import TrendLineChart from "./Charts/TrendLineChart";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [summary, setSummary] = useState("");
  const [aiAdvice, setAiAdvice] = useState("");

  const fetchData = async () => {
    let res = await getTransactions();
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    await createTransaction({
      title,
      amount,
      category,
      date: new Date().toISOString().slice(0, 10),
      type,
    });
    fetchData();
    setTitle(""); setAmount(0); setCategory("");
  };

  const handleAISuggest = async () => {
    let res = await aiSuggest(summary);
    setAiAdvice(res.data.suggestion);
  };

  return (
    <div>
      <h1>MoneyBuddy Dashboard (LKR)</h1>

      <div>
        <input value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <input value={amount} placeholder="Amount" type="number" onChange={(e) => setAmount(e.target.value)} />
        <input value={category} placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="charts">
        <ExpensePieChart data={transactions} />
        <IncomeBarChart data={transactions} />
        <TrendLineChart data={transactions} />
      </div>

      <div className="ai-box">
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Paste your monthly summary here..." />
        <button onClick={handleAISuggest}>Get AI Suggestion</button>
        {aiAdvice && <pre>{aiAdvice}</pre>}
      </div>
    </div>
  );
}

export default Dashboard;
