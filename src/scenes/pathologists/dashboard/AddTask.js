import { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  useTheme,
  Box,
  Typography,
} from "@mui/material";

const AddTask = ({ onAdd }) => {
  const theme = useTheme();
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a task");
      return;
    }

    onAdd({ text, day, reminder });

    // clear form
    setText("");
    setDay("");
    setReminder(false);
  };

  return (
    <Box
      component="form"
      className="add-form"
      onSubmit={onSubmit}
      sx={{ marginTop: "20px" }}
    >
      <Box className="form-control">
        <Typography sx={{ marginBottom: "5px" }}>Task</Typography>
        <TextField
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />
      </Box>
      <Box className="form-control">
        <Typography sx={{ marginBottom: "5px" }}>Day & Time</Typography>
        <TextField
          type="text"
          placeholder="Add Day & Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          fullWidth
        />
      </Box>
      <Box className="form-control form-control-check">
        <FormControlLabel
          control={
            <Checkbox
              checked={reminder}
              onChange={(e) => setReminder(e.target.checked)}
            />
          }
          label="Set Reminder"
        />
      </Box>

      <Button type="submit" variant="contained" fullWidth>
        Save Task
      </Button>
    </Box>
  );
};

export default AddTask;
