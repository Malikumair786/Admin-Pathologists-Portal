import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "component/Header";

const Patients = () => {
  const theme = useTheme();
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8081/appointment/all");
      setAppointments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "firstname", headerName: "First Name", flex: 1 },
    { field: "lastname", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "purpose", headerName: "Purpose", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  const handleRowClick = (id) => {
    // Find the appointment with the matching id
    const selectedAppointment = appointments.find(
      (appointment) => appointment.id === id
    );

    // Log the selected appointment to the console
    console.log("Row clicked:", selectedAppointment);
  };

  return (
    <Box m="1.5rem 2.5rem">
      {/* <h1 style={{ color: theme.palette.secondary[100] }}>Patients</h1> */}
      <Header
        title="Patients"
        subtitle="View the patients who booked the home visit requests"
      />

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
        <DataGrid
          loading={appointments.length === 0}
          getRowId={(row) => row.id}
          rows={appointments}
          columns={columns}
          onRowClick={(params) => handleRowClick(params.row.id)}
        />
      </Box>
    </Box>
  );
};

export default Patients;
