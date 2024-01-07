// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Box, useTheme, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// const Transactions = () => {
//   const theme = useTheme();
//   const [appointments, setAppointments] = useState([]);

//   const fetchAppointments = async () => {
//     try {
//       const response = await axios.get("http://localhost:8081/payments/all");
//       setAppointments(response.data);
//       console.log(response.data)
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   return (
//     <Box m="1.5rem 2.5rem">
//       <h1 style={{ color: theme.palette.secondary[100] }}>Transactions</h1>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>User Name</TableCell>
//             {/* <TableCell>Last Name</TableCell> */}
//             <TableCell>Email</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell>Date</TableCell>
//             {/* <TableCell>Purpose</TableCell>
//             <TableCell>Status</TableCell> */}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {appointments.map((appointment) => (
//             // <TableRow key={appointment.id} onClick={() => handleRowClick(appointment)}>
//             <TableRow key={appointment.id}>
//               <TableCell>{appointment.id}</TableCell>
//               <TableCell>{appointment.username}</TableCell>
//               {/* <TableCell>{appointment.lastname}</TableCell> */}
//               <TableCell>{appointment.email}</TableCell>
//               <TableCell>{appointment.status}</TableCell>
//               <TableCell>{appointment.date}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Box>
//   );
// };

// export default Transactions;


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
