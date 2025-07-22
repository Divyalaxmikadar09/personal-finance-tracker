// client/src/pages/AllTransactions.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const AllTransactions = () => {
  const [data, setData] = useState({ incomes: [], expenses: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/transaction/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>All Transactions</h2>

      <h3>Income</h3>
      <ul>
        {data.incomes.map((inc) => (
          <li key={inc.id}>₹{inc.amount} - {inc.source}</li>
        ))}
      </ul>

      <h3>Expenses</h3>
      <ul>
        {data.expenses.map((exp) => (
          <li key={exp.id}>₹{exp.amount} - {exp.category}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllTransactions;
