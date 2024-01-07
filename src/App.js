import React, { useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
// import Dashboard  from "scenes/admin/dashboard";
import Dashboard from "scenes/admin/dashboard";
import Layout from "scenes/admin/layout";
import Products from "scenes/admin/products";
import Tests from "scenes/admin/medicalTests";
import Patients from "scenes/admin/patient";
import Transactions from "scenes/admin/transactions";
import Geography from "scenes/admin/geography";
import OverView from "scenes/admin/overview";
import Daily from "scenes/admin/daily";
import Monthly from "scenes/admin/monthly";
import Breakdown from "scenes/admin/breakdown";
import Pathologists from "scenes/admin/pathologists";
import Reviews from "scenes/admin/reviews";
// import MalariaDetection from "scenes/admin/malaria_detection";
// import LeukemiaDetection from "scenes/admin/leukemia_detection";
import Admins from "scenes/admin/admins";
import PathologistsChatting from "scenes/pathologists/chatting";
import PathologistsAppointments from "scenes/pathologists/appointments";
import PathologistsDashboard from "scenes/pathologists/dashboard";
import PathologistsLayout from "scenes/pathologists/layout";
import LeukemiaDetection from "scenes/admin/leukemia_detection";
import MalariaDetection from "scenes/admin/malaria_detection";
import PathologistsPatients from "scenes/pathologists/patient";
import OrganizationProfilepage from "scenes/admin/OrganizationProfilePage";
import { useOrganization, useUser } from "@clerk/clerk-react";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const { organization, membership, isLoaded } = useOrganization();

  if (!isLoaded || !organization) {
    return null;
  }

  const isAdmin = membership.role === "admin";

  return isAdmin ? (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/Stats" element={<Geography />} />
            <Route path="/overview" element={<OverView />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/breakdown" element={<Breakdown />} />
            <Route path="/pathologists" element={<Pathologists />} />
            <Route path="/admins" element={<Admins />} />
            {/* <Route path = "/performance" element = {<Performance />} /> */}
            <Route path="/reviews" element={<Reviews />} />
            {/* <Route path = "/malaria" element = {<MalariaDetection/>} /> */}
            {/* <Route path = "/leukemia" element = {<LeukemiaDetection/>} /> */}
            <Route path="/Profile" element={<OrganizationProfilepage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  ) : (
    <div className="app">
      {/* for setup of material UI */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<PathologistsLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<PathologistsDashboard />} />
            <Route path="/patients" element={<PathologistsPatients />} />
            <Route path="/malaria" element={<MalariaDetection />} />
            <Route path="/leukemia" element={<LeukemiaDetection />} />
            <Route path="/chatting" element={<PathologistsChatting />} />
            <Route
              path="/appointments"
              element={<PathologistsAppointments />}
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
