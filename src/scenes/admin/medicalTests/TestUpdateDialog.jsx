import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

import axios from "axios";

const TestUpdateDialog = ({ open, onClose, Test, refetchTests }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: {
      name: "",
      description: "",
    },
    price: 0,
    description: "",
    picture: "",
  });

  useEffect(() => {
    setFormData({
      name: Test?.name || "",
      category: {
        name: Test?.category?.name || "",
        description: Test?.category?.description || "",
      },
      price: Test?.price || 0,
      description: Test?.description || "",
      picture: Test?.picture || "",
    });
  }, [Test]);

  const handleInputChange = (field) => (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: event.target.value,
    }));
  };

  const handleUpdateTest = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/client/medical-tests/${Test?._id}`,
        formData
      );

      // Check if the request was successful
      if (response.status === 200) {
        console.log("Updated Test:", response.data);
        onClose();
        refetchTests();
      } else {
        console.error("Error updating Test:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating Test:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Test</DialogTitle>
      <DialogContent>
        <DialogContentText>Update Test Information here</DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          variant="outlined"
          value={formData.name}
          onChange={handleInputChange("name")}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <TextField
          margin="dense"
          id="categoryName"
          label="Category Name"
          type="text"
          variant="outlined"
          value={formData.category.name}
          onChange={handleInputChange("category.name")}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <TextField
          margin="dense"
          id="categoryDescription"
          label="Category Description"
          type="text"
          variant="outlined"
          value={formData.category.description}
          onChange={handleInputChange("category.description")}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <TextField
          margin="dense"
          id="price"
          label="Price"
          type="number"
          variant="outlined"
          value={formData.price}
          onChange={handleInputChange("price")}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          variant="outlined"
          value={formData.description}
          onChange={handleInputChange("description")}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button onClick={handleUpdateTest} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TestUpdateDialog;
