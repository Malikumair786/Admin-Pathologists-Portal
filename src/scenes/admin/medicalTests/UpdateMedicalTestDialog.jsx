import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import axios from "axios";

const UpdateMedicalTestDialog = ({
  open,
  handleClose,
  selectedTest,
  refetchTests,
}) => {
  const theme = useTheme();
  const [updatedTest, setUpdatedTest] = useState({
    testName: "",
    testDescription: "",
    testCategory: "",
    testPrice: "",
  });

  useEffect(() => {
    // Populate the form with the current information of the selected test
    if (selectedTest) {
      setUpdatedTest({
        testName: selectedTest.name || "",
        testDescription: selectedTest.description || "",
        testCategory: selectedTest.category.name || "",
        testPrice: selectedTest.price || "",
      });
    }
  }, [selectedTest]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTest({ ...updatedTest, [name]: value });
  };

  const handleUpdateTest = async () => {
    try {
      const updatedData = {
        testName: updatedTest.testName,
        testDescription: updatedTest.testDescription,
        testCategory: updatedTest.testCategory,
        testPrice: updatedTest.testPrice,
      };

      await axios.put(
        `http://localhost:8081/api/tests/update/${selectedTest._id}`,
        updatedData
      );

      refetchTests();
      handleClose();
    } catch (error) {
      console.error("Error updating Test:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Test</DialogTitle>
      <DialogContent>
        <TextField
          label="Test Name"
          name="testName"
          value={updatedTest.testName}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          variant="outlined"
        />
        <TextField
          label="Test Description"
          name="testDescription"
          value={updatedTest.testDescription}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          variant="outlined"
        />
        <TextField
          label="Test Category"
          name="testCategory"
          value={updatedTest.testCategory}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          variant="outlined"
        />
        <TextField
          label="Test Price"
          name="testPrice"
          type="number"
          value={updatedTest.testPrice}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateTest} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateMedicalTestDialog;
