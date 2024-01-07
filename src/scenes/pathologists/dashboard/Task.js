// import { FaTimes } from 'react-icons/fa'

// const Task = ({ task, onDelete, onToggle }) => {
//   return (
//     <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
//       <h3>
//         {task.text}
//         <FaTimes
//           style={{ color: 'red', cursor: 'pointer' }}
//           onClick={() => onDelete(task.id)}
//         />
//       </h3>
//       <p>{task.day}</p>

//     </div>
//   )
// }

// export default Task
import React from "react";
import { Box, Typography } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { Theme } from "@mui/material";
import { useTheme } from "@emotion/react";

const Task = ({ task, onDelete, onToggle }) => {
  const theme = useTheme();
  console.log("Task: 1", task);
  return (
    <Box
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
      p="3"
      m="2"
      borderRadius="md"
      boxShadow="md"
      // bgcolor="background.paper"
      style={{
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <Typography
        variant="h6"
        style={{
          color: theme.palette.secondary[100],
          cursor: "pointer",
          marginLeft: "10px",
        }}
      >
        {task.description}
        <FaTimes
          style={{ color: "red", cursor: "pointer", marginLeft: "10px" }}
          onClick={() => onDelete(task.id)}
        />
      </Typography>
      <Typography
        style={{
          color: theme.palette.secondary[100],
          cursor: "pointer",
          marginLeft: "10px",
        }}
        variant="body1"
      >
        {task.dayAndTime}
      </Typography>
    </Box>
  );
};

export default Task;
