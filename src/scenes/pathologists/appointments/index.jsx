// // Appointments.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Box, useTheme, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
// import TestResultForm from "./TestResultForm";

// const PathologistsAppointments = () => {
//   const theme = useTheme();
//   const [appointments, setAppointments] = useState([]);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [isTestResultFormOpen, setIsTestResultFormOpen] = useState(false);

//   const fetchAppointments = async () => {
//     try {
//       const response = await axios.get("http://localhost:8081/appointment/all");
//       setAppointments(response.data);
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const handleRowClick = (appointment) => {
//     setSelectedAppointment(appointment);
//     setIsTestResultFormOpen(true);
//   };

//   const handleCloseTestResultForm = () => {
//     setIsTestResultFormOpen(false);
//   };

//   const columns = [
//     { field: "id", headerName: "ID", flex: 1 },
//     { field: "firstname", headerName: "First Name", flex: 1 },
//     { field: "lastname", headerName: "Last Name", flex: 1 },
//     { field: "email", headerName: "Email", flex: 1 },
//     { field: "country", headerName: "Country", flex: 1 },
//     { field: "city", headerName: "City", flex: 1 },
//     { field: "purpose", headerName: "Purpose", flex: 1 },
//     { field: "status", headerName: "Status", flex: 1 },
//   ];

//   return (
//     <Box m="1.5rem 2.5rem">
//       <h1 style={{ color: theme.palette.secondary[100] }}>Appointments</h1>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>First Name</TableCell>
//             <TableCell>Last Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Country</TableCell>
//             <TableCell>City</TableCell>
//             <TableCell>Purpose</TableCell>
//             <TableCell>Status</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {appointments.map((appointment) => (
//             <TableRow key={appointment.id} onClick={() => handleRowClick(appointment)}>
//               <TableCell>{appointment.id}</TableCell>
//               <TableCell>{appointment.firstname}</TableCell>
//               <TableCell>{appointment.lastname}</TableCell>
//               <TableCell>{appointment.email}</TableCell>
//               <TableCell>{appointment.country}</TableCell>
//               <TableCell>{appointment.city}</TableCell>
//               <TableCell>{appointment.purpose}</TableCell>
//               <TableCell>{appointment.status}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {isTestResultFormOpen && (
//         <TestResultForm
//           selectedAppointment={selectedAppointment}
//           open={isTestResultFormOpen}
//           onClose={handleCloseTestResultForm}
//         />
//       )}
//     </Box>
//   );
// };

// export default PathologistsAppointments;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TestResultForm from "./TestResultForm";

const PathologistsAppointments = () => {
  const theme = useTheme();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isTestResultFormOpen, setIsTestResultFormOpen] = useState(false);

  // const fetchAppointments = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8081/appointment/all");
  //     setAppointments(response.data);
  //   } catch (error) {
  //     console.error("Error fetching appointments:", error);
  //   }
  // };
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8081/appointment/all");
      console.log(response);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // useEffect(() => {
  //   fetchAppointments();
  // }, []);
  useEffect(() => {
    fetchAppointments();
  }, []);
  // Filter appointments based on status
  const filteredAppointments = appointments.filter(
    (appointment) =>
      // appointment.status === "in-progress" || appointment.status === "completed"
      appointment.status === "completed"
  );

  // const handleRowClick = (params) => {
  //   setSelectedAppointment(params.row);
  //   setIsTestResultFormOpen(true);
  // };
  const handleRowClick = (params) => {
    setSelectedAppointment(params.row);
    setIsTestResultFormOpen(true);
  };

  const handleCloseTestResultForm = () => {
    setIsTestResultFormOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "firstname", headerName: "First Name", flex: 1 },
    // { field: "lastname", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    // { field: "country", headerName: "Country", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "purpose", headerName: "Purpose", flex: 1.5 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "testType", headerName: "TestType", flex: 1 },
    // { field: "testResult", headerName: "TestResult", flex: 1 },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <h1 style={{ color: theme.palette.secondary[100] }}>Appointments</h1>
      {/* <div style={{ height: 400, width: "100%" }}> */}
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        {/* <DataGrid
          rows={appointments}
          columns={columns}
          pageSize={5}
          onRowClick={handleRowClick}
        /> */}
        <DataGrid
          rows={filteredAppointments}
          columns={columns}
          pageSize={5}
          onRowClick={handleRowClick}
        />
      </Box>

      {isTestResultFormOpen && (
        <TestResultForm
          selectedAppointment={selectedAppointment}
          open={isTestResultFormOpen}
          onClose={handleCloseTestResultForm}
        />
      )}
      {/* <TestResultForm
        selectedAppointment={selectedAppointment}
        open={isTestResultFormOpen}
        onClose={handleCloseTestResultForm}
        onSave={fetchAppointments}
      /> */}
    </Box>
  );
};

export default PathologistsAppointments;
