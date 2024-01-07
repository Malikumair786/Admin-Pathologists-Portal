import React, { useState, useEffect } from "react";
import FlexBetween from "component/FlexBetween";
import Header from "component/Header";
import axios from "axios";
import { Email, PointOfSale, PersonAdd, Traffic } from "@mui/icons-material";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import BreakdownChart from "component/BreakdownChart";
import OverviewChart from "component/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "component/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const [appointments, setAppointments] = useState([]);
  const [todaySales, setTodaySales] = useState([]);
  const [monthlySales, setMonthlySales] = useState(0);
  const [yearlySales, setYearlySales] = useState(0);
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const { data } = useGetDashboardQuery();

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8081/payments/total-scuuessful-appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchTodaySales = async () => {
    try {
      const response = await axios.get(
    
        "http://localhost:8081/payments/today-sales"
      );

      console.log(response.data + " umairoooooooooo")
      // Format the floating-point number to remove the decimal part if it's ".0"
      setTodaySales(response.data);
    } catch (error) {
      console.error("Error fetching today's sales:", error);
    }
  };

  // const fetchMonthlySales = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8081/payments/monthly-sales"
  //     );
  //     setMonthlySales(response.data);
  //   } catch (error) {
  //     console.error("Error fetching monthly sales:", error);
  //   }
  // };


  const fetchMonthlySales = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/payments/monthly-sales"
      );
      
      // Get the current month (1-indexed)
      const currentMonth = new Date().getMonth() + 1;

      // Filter the response data to get only the data for the current month
      const currentMonthData = response.data.find(
        ([month]) => month === currentMonth
      );

      // Set the monthlySales state with the data for the current month
      setMonthlySales(currentMonthData ? currentMonthData[1] : 0);
    } catch (error) {
      console.error("Error fetching monthly sales:", error);
    }
  };

  const fetchYearlySales = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/payments/yearly-sales"
      );

      // Get the current year
      const currentYear = new Date().getFullYear();

      // Find the sales data for the current year
      const currentYearSales = response.data.find(([year]) => year === currentYear);

      // Extract and set only the sales value
      const [, yearlySalesValue] = currentYearSales || [null, 0];
      setYearlySales(yearlySalesValue);
    } catch (error) {
      console.error("Error fetching yearly sales:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchTodaySales();
    fetchMonthlySales();
    fetchYearlySales();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="Total Appointments"
          value={appointments}
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="Today Sales"
          value={todaySales}
          increase={`+${Math.floor(Math.random() * 30)}%`}
          description="Since yesterday"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Monthly Sales"
          value={monthlySales}
          increase={`+${Math.floor(Math.random() * 10)}%`}
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={yearlySales}
          increase={`+${Math.floor(Math.random() * 20)}%`}
          description="Since last year"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;