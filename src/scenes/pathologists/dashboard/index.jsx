import { useState, useEffect } from "react";
import HeaderCom from "./HeaderCom";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import "./index.css";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TestResultForm from "../appointments/TestResultForm";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [reloadTasks, setReloadTasks] = useState(false);

  const [showAddTask, setShowAddTask] = useState(true);
  const theme = useTheme();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isTestResultFormOpen, setIsTestResultFormOpen] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  console.log(user.primaryEmailAddress.emailAddress);
  const email = String(user.primaryEmailAddress.emailAddress);
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8081/appointment/all");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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
    { field: "lastname", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "purpose", headerName: "Purpose", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "testType", headerName: "TestType", flex: 1 },
    // { field: "Result", headerName: "Result", flex: 1 },
  ];

  const getTasks = async () => {
    try {
      console.log("dfsdfsdfsdfsdf");
      const response = await axios.get(
        `http://localhost:8081/tasks/specific/${email}`
      );
      setTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    getTasks();
  }, [reloadTasks]);
  // fetch task
  const fetchTask = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  // add task
  const addTask = async (task) => {
    try {
      const response = await axios.post(
        `http://localhost:8081/tasks/add/${email}`,
        task
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization:
        //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYWxpazEiLCJpYXQiOjE3MDEwMDAxNzEsImV4CI6MTcwMTAwMDE3Mn0.XbE6mNlXFkz62rwLjfsIMxiLfV8Hyd-cToc4BcdF8J8",
        //   },
        // }
      );
      if (response.status === 200) {
        getTasks();
      }

      // setReloadTasks(!reloadTasks); // Trigger component reload
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      console.log("h1");
      const response = await axios.get(
        `http://localhost:8081/tasks/delete/${id}`
      );
      console.log(response.status);
      if (response.status === 200) {
        setTasks(tasks.filter((task) => task.id !== id));
      }
      // setReloadTasks(!reloadTasks);
      // getTasks();
      // Toggle the state to trigger a component reload
    } catch (error) {
      console.error("Error deleting task:", error);
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  // toggle reminder
  const toggleReminder = async (id) => {
    try {
      const taskToToggle = await fetchTask(id);
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
      const response = await axios.put(
        `http://localhost:8081/tasks/${id}`,
        updTask,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, reminder: response.data.reminder } : task
        )
      );
    } catch (error) {
      console.error("Error toggling reminder:", error);
    }
  };

  // Filter appointments with status "Pending"
  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "in-progress"
  );

  return (
    <Box>
      <Box className="container">
        <HeaderCom
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />{" "}
        {showAddTask && <AddTask onAdd={addTask} />}{" "}
        {tasks.length > 0 ? (
          <Tasks
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleReminder}
          />
        ) : (
          "Go add some tasks!"
        )}{" "}
      </Box>
      <Box m="1.5rem 2.5rem">
        <h1 style={{ color: theme.palette.secondary[100] }}>Appointments</h1>
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
            rows={pendingAppointments}
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
      </Box>
    </Box>
  );
}

export default Dashboard;
