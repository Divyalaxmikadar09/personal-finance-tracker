import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ onLogout }) => {
  return (
    <div style={{ padding: "2rem" }}>
      <button
        onClick={onLogout}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          marginBottom: "1rem",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <h1>Welcome to the Dashboard</h1>
      <p>This is a placeholder. You’ll see your finances here soon!</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
        <Link to="/add-income">
          <button style={buttonStyle}>➕ Add Income</button>
        </Link>
        <Link to="/add-expense">
          <button style={buttonStyle}>➖ Add Expense</button>
        </Link>
        <Link to="/transactions">
          <button style={buttonStyle}>📊 View All Transactions</button>
        </Link>
      </div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "white",
  padding: "0.75rem 1rem",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
};

export default Dashboard;
