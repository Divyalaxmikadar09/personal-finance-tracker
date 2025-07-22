import { useState } from "react";
import axios from "axios";

const AddIncome = () => {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/transaction/income",
        { amount: parseFloat(amount), source },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Income added successfully!");
      setAmount("");
      setSource("");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error adding income");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Add Income</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        />
        <button type="submit" style={{ padding: "0.5rem", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}>
          ➕ Add Income
        </button>
      </form>
      {message && <p style={{ marginTop: "1rem", color: message.includes("Error") ? "red" : "green" }}>{message}</p>}
    </div>
  );
};

export default AddIncome;
