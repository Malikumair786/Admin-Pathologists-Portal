import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useGetTestsQuery } from "state/api";

const AddMedicalTestForm = ({
  open,
  handleClose,
  handleSave,
  refetchTests,
}) => {
  const [testData, setTestData] = useState({
    testName: "",
    testType: "",
    testPrice: 0,
    testDescription: "",
    testCategory: "",
  });

  const handleChange = (field) => (event) => {
    setTestData((prevData) => ({
      ...prevData,
      [field]: event.target.value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/tests",
        testData
      );
      handleSave(response.data);
      // console.log(response.data);
      handleClose();
      refetchTests();
    } catch (error) {
      console.error("Error saving medical test:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Medical Test</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the details for the new medical test.
        </DialogContentText>
        <TextField
          margin="dense"
          id="testName"
          label="Test Name"
          type="text"
          fullWidth
          value={testData.testName}
          onChange={handleChange("testName")}
        />
        <TextField
          margin="dense"
          id="testCategory"
          label="Category Name"
          type="text"
          fullWidth
          value={testData.testCategory}
          onChange={handleChange("testCategory")}
        />
        <TextField
          margin="dense"
          id="testDescription"
          label="Category Description"
          type="text"
          fullWidth
          value={testData.testDescription}
          onChange={handleChange("testDescription")}
        />
        <TextField
          margin="dense"
          id="testPrice"
          label="Price"
          type="number"
          fullWidth
          value={testData.testPrice}
          onChange={handleChange("testPrice")}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveClick}>Save Test</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMedicalTestForm;
