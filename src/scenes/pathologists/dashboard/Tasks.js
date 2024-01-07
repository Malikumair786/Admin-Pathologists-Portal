// import Task from "./Task"

// const Tasks = ({ tasks, onDelete, onToggle }) => {
//   return (
//     <>
//       {tasks.map((task, index) => (
//         <Task
//           key={index}
//           task={task}
//           onDelete={onDelete}
//           onToggle={onToggle}
//         />
//       ))}
//     </>
//   )
// }

// export default Tasks
import React from "react";
import { Stack } from "@mui/material";
import Task from "./Task";

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <Stack spacing={4} alignItems="stretch">
      {tasks.map((task, index) => (
        <Task
          style={{
            backgroundColor: "pink",
            color: "blue",
            cursor: "pointer",
            marginLeft: "10px",
          }}
          key={index}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </Stack>
  );
};

export default Tasks;
