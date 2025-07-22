// client/src/pages/Dashboard.jsx

import React from "react";

<button
  className="bg-red-500 text-white px-4 py-1 rounded mb-4"
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
>
  Logout
</button>


const Dashboard = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to the Dashboard</h1>
      <p>This is a placeholder. You’ll see your finances here soon!</p>
    </div>
  );
};

export default Dashboard;
