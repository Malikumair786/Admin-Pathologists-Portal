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

const PathologistUpdateDialog = ({
  open,
  onClose,
  pathologist,
  refetchPathologists,
}) => {
  const [formData, setFormData] = useState({
    name: pathologist?.name || "",
    email: pathologist?.email || "",
    phoneNumber: pathologist?.phoneNumber || "",
    password: "",
    role: pathologist?.role || "pathologist",
    country: pathologist?.country || "",
    city: pathologist?.city || "",
    showPassword: false,
    isDirty: false,
  });


  useEffect(() => {
    setFormData({
      name: pathologist?.name || "",
      email: pathologist?.email || "",
      phoneNumber: pathologist?.phoneNumber || "",
      password: "",
      role: pathologist?.role || "pathologist",
      country: pathologist?.country || "Pakistan",
      city: pathologist?.city || "Islamabad",
      showPassword: false,
      isDirty: false,
    });
  }, [pathologist]);

  const handleInputChange = (field) => (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: event.target.value,
      isDirty: true,
    }));
  };

  const handleUpdatePathologist = async () => {
    // Only update if the form is dirty
    if (!formData.isDirty) {
      onClose();
      return;
    }

    // Extract fields that have changed
    const updatedFields = {};
    for (const key in formData) {
      if (formData[key] !== pathologist[key]) {
        updatedFields[key] = formData[key];
      }
    }

    try {
      const response = await axios.put(
        `http://localhost:5001/management/pathologists/${pathologist?._id}`,
        updatedFields
      );

      // Check if the request was successful
      if (response.status === 200) {
        console.log("Updated Pathologist:", response.data);
        setFormData({ ...formData, isDirty: false });
        onClose();
        refetchPathologists();
      } else {
        console.error("Error updating pathologist:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating pathologist:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Pathologist</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Update Pathologist Information here
        </DialogContentText>

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
          id="email"
          label="Email Address"
          type="email"
          variant="outlined"
          value={formData.email}
          onChange={handleInputChange("email")}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <TextField
          id="phoneNumber"
          label="Phone Number"
          type="text"
          variant="outlined"
          value={formData.phoneNumber}
          onChange={handleInputChange("phoneNumber")}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <TextField
          margin="dense"
          id="country"
          label="Country"
          select
          variant="outlined"
          value={formData.country}
          onChange={handleInputChange("country")}
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          <MenuItem value="Pakistan">Pakistan</MenuItem>
        </TextField>

        <TextField
          margin="dense"
          id="city"
          label="City"
          select
          variant="outlined"
          value={formData.city}
          onChange={handleInputChange("city")}
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          <MenuItem value="Rawalpindi">Rawalpindi</MenuItem>
          <MenuItem value="Islamabad">Islamabad</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button onClick={handleUpdatePathologist} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PathologistUpdateDialog;
