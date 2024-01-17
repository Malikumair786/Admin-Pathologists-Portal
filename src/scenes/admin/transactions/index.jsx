
// Transactions Component
import React, { useState, useEffect } from "react";
import axios from "axios";
import TableComponent from "./TableComponent";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:8081/payments/all");
      setTransactions(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "username", headerName: "User Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
  ];

  return (
    <TableComponent
      title="Transactions"
      columns={columns}
      data={transactions}
    />
  );
};

export default Transactions;
