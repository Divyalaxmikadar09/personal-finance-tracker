import { useState } from "react";
import axios from "axios";

const AddExpense = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/transaction/expense",
        { amount: parseFloat(amount), category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Expense added successfully!");
      setAmount("");
      setCategory("");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error adding expense");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Add Expense</h2>
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
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button type="submit" style={{ padding: "0.5rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
          ➖ Add Expense
        </button>
      </form>
      {message && <p style={{ marginTop: "1rem", color: message.includes("Error") ? "red" : "green" }}>{message}</p>}
    </div>
  );
};

export default AddExpense;
