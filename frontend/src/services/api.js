import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api"
});

export const getTransactions = () => API.get("/transactions");
export const createTransaction = (data) => API.post("/transactions/", data);
export const aiSuggest = (summary) =>
  API.post("/ai/suggest/", { summary });
