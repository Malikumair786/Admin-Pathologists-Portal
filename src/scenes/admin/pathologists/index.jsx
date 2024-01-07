// import React from "react";
// import {
//   Box,
//   Button,
//   useTheme,
//   MenuItem,
//   IconButton,
//   FormControl,
//   OutlinedInput,
//   InputLabel,
//   InputAdornment,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField,
// } from "@mui/material";

// import DeleteIcon from "@mui/icons-material/Delete";
// import UpdateIcon from "@mui/icons-material/Update";

// import { DataGrid } from "@mui/x-data-grid";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

// import Header from "component/Header";
// import FlexBetween from "component/FlexBetween";
// import PathologistUpdateDialog from "./PathologistUpdateDialog"; 
// import { useGetPathologistsQuery } from "state/api";
// import { useDeletePathologistMutation } from "state/api";

// import axios from "axios"; 

// const Pathologists = () => {
//   const {
//     data,
//     isLoading,
//     refetch: refetchPathologists,
//   } = useGetPathologistsQuery();
//   const [deletePathologist] = useDeletePathologistMutation();

//   const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
//   const [selectedPathologistId, setSelectedPathologistId] =
//     React.useState(null);

//   const [open, setOpen] = React.useState(false);
//   const theme = useTheme();

//   const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
//   const [selectedPathologist, setSelectedPathologist] = React.useState(null);

//   const [formData, setFormData] = React.useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     role: "pathologist",
//     country: "Pakistan",
//     city: "Islamabad",
//   });

//   const [showPassword, setShowPassword] = React.useState(false);
//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleInputChange = (field) => (event) => {
//     setFormData({ ...formData, [field]: event.target.value });
//   };

//   const handleAddPathologist = async () => {
//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       console.error("Invalid email format");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5001/management/pathologists",
//         formData
//       );

//       // Check if the request was successful
//       if (response.status === 201) {
//         console.log("Added Pathologist:", response.data);
//         setFormData({
//           name: "",
//           email: "",
//           phoneNumber: "",
//           password: "",
//           role: "pathologist",
//           country: "Pakistan",
//           city: "Islamabad",
//         });

//         handleClose();
//         refetchPathologists();
//       } else {
//         console.error("Error adding pathologist:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error adding pathologist:", error);
//     }
//   };

//   const handleDeletePathologist = async (pathologistId) => {
//     try {
//       setConfirmDialogOpen(true);
//       await deletePathologist(pathologistId);
//       setSelectedPathologistId(null);
//       refetchPathologists();
//       setConfirmDialogOpen(false);
//     } catch (error) {
//       console.error("Error deleting pathologist:", error);
//     }
//   };

//   const handleUpdatePathologist = (pathologistId) => {
//     // Find the selected pathologist based on ID
//     const pathologistToUpdate = data.find((p) => p._id === pathologistId);

//     // Set the selected pathologist and open the update dialog
//     setSelectedPathologist(pathologistToUpdate);
//     setUpdateDialogOpen(true);
//   };

//   const handleConfirmDialogOpen = (pathologistId) => {
//     setSelectedPathologistId(pathologistId);
//     setConfirmDialogOpen(true);
//   };

//   const handleConfirmDialogClose = () => {
//     setConfirmDialogOpen(false);
//     setSelectedPathologistId(null);
//   };

//   const columns = [
//     {
//       field: "_id",
//       headerName: "ID",
//       flex: 1,
//     },
//     {
//       field: "name",
//       headerName: "Name",
//       flex: 0.7,
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       flex: 1,
//     },
//     {
//       field: "phoneNumber",
//       headerName: "Phone Number",
//       flex: 0.75,
//       renderCell: (params) => {
//         return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
//       },
//     },
//     {
//       field: "country",
//       headerName: "Country",
//       flex: 0.4,
//     },
//     {
//       field: "city",
//       headerName: "City",
//       flex: 0.6,
//     },  
//     {
//       field: "role",
//       headerName: "Role",
//       flex: 0.4,
//     },
//     {
//       field: "delete",
//       headerName: "Delete",
//       flex: 0.3,
//       renderCell: (params) => (
//         <IconButton onClick={() => handleConfirmDialogOpen(params.row._id)}>
//           <DeleteIcon />
//         </IconButton>
//       ),
//     },
//     // New column for update action
//     {
//       field: "update",
//       headerName: "Update",
//       flex: 0.3,
//       renderCell: (params) => (
//         <IconButton onClick={() => handleUpdatePathologist(params.row._id)}>
//           <UpdateIcon />
//         </IconButton>
//       ),
//     },
//   ];

//   return (
//     <Box m="1.5rem 2.5rem">
//       <FlexBetween>
//         <Header
//           title="Pathologists"
//           subtitle="Managing pathologists and list of pathologists"
//         />
//         <Box>
//           <React.Fragment>
//             <Button
//               sx={{
//                 backgroundColor: theme.palette.secondary.light,
//                 color: theme.palette.background.alt,
//                 fontSize: "14px",
//                 fontWeight: "bold",
//                 padding: "10px 20px",
//               }}
//               variant="outlined"
//               onClick={handleClickOpen}
//             >
//               Add Pathologists
//             </Button>
//             <Dialog open={open} onClose={handleClose}>
//               <DialogTitle>Add Pathologist</DialogTitle>
//               <DialogContent>
//                 <DialogContentText>
//                   Enter Pathologists Information here
//                 </DialogContentText>

//                 <TextField
//                   required
//                   autoFocus
//                   margin="dense"
//                   id="name"
//                   label="Name"
//                   type="text"
//                   variant="outlined"
//                   value={formData.name}
//                   onChange={handleInputChange("name")}
//                   fullWidth
//                   sx={{ marginBottom: 2 }}
//                 />

//                 <TextField
//                   required
//                   margin="dense"
//                   id="email"
//                   label="Email Address"
//                   type="email"
//                   variant="outlined"
//                   value={formData.email}
//                   onChange={handleInputChange("email")}
//                   fullWidth
//                   sx={{ marginBottom: 2 }}
//                 />

//                 <TextField
//                   required
//                   id="phoneNumber"
//                   label="Phone Number"
//                   type="text"
//                   variant="outlined"
//                   value={formData.phoneNumber}
//                   onChange={handleInputChange("phoneNumber")}
//                   fullWidth
//                   sx={{ marginBottom: 2 }}
//                 />

//                 <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                   <InputLabel required htmlFor="outlined-adornment-password">
//                     Password
//                   </InputLabel>
//                   <OutlinedInput
//                     id="outlined-adornment-password"
//                     type={showPassword ? "text" : "password"}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label="toggle password visibility"
//                           onClick={handleClickShowPassword}
//                           onMouseDown={handleMouseDownPassword}
//                           edge="end"
//                         >
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                     label="Password"
//                     value={formData.password}
//                     onChange={handleInputChange("password")}
//                   />
//                 </FormControl>

//                 <TextField
//                   margin="dense"
//                   id="role"
//                   label="Role"
//                   defaultValue="Pathologists"
//                   variant="outlined"
//                   value={formData.role}
//                   onChange={handleInputChange("role")}
//                   fullWidth
//                   sx={{ marginBottom: 2 }}
//                 />

//                 <TextField
//                   margin="dense"
//                   id="country"
//                   label="Country"
//                   select
//                   variant="outlined"
//                   value={formData.country}
//                   onChange={handleInputChange("country")}
//                   fullWidth
//                   sx={{ marginBottom: 2 }}
//                 >
//                   <MenuItem value="Pakistan">Pakistan</MenuItem>
//                 </TextField>

//                 <TextField
//                   margin="dense"
//                   id="city"
//                   label="City"
//                   select
//                   variant="outlined"
//                   value={formData.city}
//                   onChange={handleInputChange("city")}
//                   fullWidth
//                   sx={{ marginBottom: 2 }}
//                 >
//                   <MenuItem value="Rawalpindi">Rawalpindi</MenuItem>
//                   <MenuItem value="Islamabad">Islamabad</MenuItem>
//                 </TextField>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleClose}>Cancel</Button>
//                 <Button
//                   onClick={handleAddPathologist}
//                   variant="contained"
//                   color="primary"
//                 >
//                   Save
//                 </Button>
//               </DialogActions>
//             </Dialog>
//           </React.Fragment>
//         </Box>
//       </FlexBetween>

//       <Box
//         mt="40px"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: theme.palette.background.alt,
//             color: theme.palette.secondary[100],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: theme.palette.primary.light,
//           },
//           "& .MuiDataGrid-footerContainer": {
//             backgroundColor: theme.palette.background.alt,
//             color: theme.palette.secondary[100],
//             borderTop: "none",
//           },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//             color: `${theme.palette.secondary[200]} !important`,
//           },
//         }}
//       >
//         <DataGrid
//           loading={isLoading || !data}
//           getRowId={(row) => row._id}
//           rows={data || []}
//           columns={columns}
//         />
//       </Box>

//       <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <p>Are you sure you want to delete this pathologist?</p>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleConfirmDialogClose} color="primary">
//             Cancel
//           </Button>
//           <Button
//             onClick={() => handleDeletePathologist(selectedPathologistId)}
//             variant="contained"
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <PathologistUpdateDialog
//         open={updateDialogOpen}
//         onClose={() => {
//           setUpdateDialogOpen(false);
//           setSelectedPathologist(null);
//         }}
//         pathologist={selectedPathologist} 
//         refetchPathologists={refetchPathologists}
//       />
//     </Box>
//   );
// };

// export default Pathologists;



// import React from 'react';
// import { Box, useTheme, IconButton } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import DeleteIcon from '@mui/icons-material/Delete';
// import UpdateIcon from '@mui/icons-material/Update';
// import { useOrganization } from '@clerk/clerk-react';
// const Pathologists = () => {
//   const { membershipList, membership } = useOrganization({
//     membershipList: {},
//   });

//   const theme = useTheme();

//   if (!membershipList) {
//     return null;
//   }

//   // Filter members whose role is 'admin'
//   const adminMembers = membershipList.filter((m) => m.role === 'admin');

//   const rows = adminMembers.map((m) => ({
//     id: m.id,
//     firstName: m.publicUserData.firstName,
//     lastName: m.publicUserData.lastName,
//     identifier: m.publicUserData.identifier,
//     role: m.role,
//   }));

//   const columns = [
//     { field: 'id', headerName: 'ID', flex: 1 },
//     { field: 'firstName', headerName: 'First Name', flex: 0.7 },
//     { field: 'lastName', headerName: 'Last Name', flex: 0.7 },
//     { field: 'identifier', headerName: 'Identifier', flex: 1 },
//     { field: 'role', headerName: 'Role', flex: 0.4 },
//     {
//       field: 'delete',
//       headerName: 'Delete',
//       flex: 0.3,
//       renderCell: (params) => (
//         <IconButton onClick={() => handleConfirmDialogOpen(params.row.id)}>
//           <DeleteIcon />
//         </IconButton>
//       ),
//     },
//     {
//       field: 'update',
//       headerName: 'Update',
//       flex: 0.3,
//       renderCell: (params) => (
//         <IconButton onClick={() => handleUpdateAdmin(params.row.id)}>
//           <UpdateIcon />
//         </IconButton>
//       ),
//     },
//   ];

//   const handleConfirmDialogOpen = (userId) => {
//     // Handle opening a confirmation dialog for deletion
//     console.log(`Delete user with ID: ${userId}`);
//   };

//   const handleUpdateAdmin = (userId) => {
//     // Handle updating the admin role
//     console.log(`Update admin with ID: ${userId}`);
//   };

//   return (
//     <Box m="1.5rem 2.5rem">
//       <Box
//         mt="40px"
//         height="75vh"
//         sx={{
//           '& .MuiDataGrid-root': {
//             border: 'none',
//           },
//           '& .MuiDataGrid-cell': {
//             borderBottom: 'none',
//           },
//           '& .MuiDataGrid-columnHeaders': {
//             backgroundColor: theme.palette.background.alt,
//             color: theme.palette.secondary[100],
//             borderBottom: 'none',
//           },
//           '& .MuiDataGrid-virtualScroller': {
//             backgroundColor: theme.palette.primary.light,
//           },
//           '& .MuiDataGrid-footerContainer': {
//             backgroundColor: theme.palette.background.alt,
//             color: theme.palette.secondary[100],
//             borderTop: 'none',
//           },
//           '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
//             color: `${theme.palette.secondary[200]} !important`,
//           },
//         }}
//       >
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           loading={!membershipList}
//           pageSize={10}
//           rowsPerPageOptions={[10, 20, 50]}
//           autoHeight
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Pathologists;

// ... (previous imports)





import React from 'react';
import { Box, useTheme, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { useOrganization } from '@clerk/clerk-react';

const Pathologists = () => {
  const { membershipList, membership } = useOrganization({
    membershipList: {},
  });

  const theme = useTheme();

  if (!membershipList) {
    return null;
  }

  // Filter members whose role is 'admin'
  // const adminMembers = membershipList.filter((m) => m.role === 'admin');
  
  // Filter members whose role is 'basic_member'
  const basicMembers = membershipList.filter((m) => m.role === 'basic_member');

  // Combine both admin and basic members
  // const allMembers = [...adminMembers, ...basicMembers];

  const rows = basicMembers.map((m) => ({
    id: m.id,
    firstName: m.publicUserData.firstName,
    lastName: m.publicUserData.lastName,
    identifier: m.publicUserData.identifier,
    role: m.role,
  }));

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 0.7 },
    { field: 'lastName', headerName: 'Last Name', flex: 0.7 },
    { field: 'identifier', headerName: 'Identifier', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 0.4 },
    // {
    //   field: 'delete',
    //   headerName: 'Delete',
    //   flex: 0.3,
    //   renderCell: (params) => (
    //     <IconButton onClick={() => handleConfirmDialogOpen(params.row.id)}>
    //       <DeleteIcon />
    //     </IconButton>
    //   ),
    // },
    // {
    //   field: 'update',
    //   headerName: 'Update',
    //   flex: 0.3,
    //   renderCell: (params) => (
    //     <IconButton onClick={() => handleUpdateAdmin(params.row.id)}>
    //       <UpdateIcon />
    //     </IconButton>
    //   ),
    // },
  ];

  const handleConfirmDialogOpen = (userId) => {
    // Handle opening a confirmation dialog for deletion
    console.log(`Delete user with ID: ${userId}`);
  };

  const handleUpdateAdmin = (userId) => {
    // Handle updating the admin role
    console.log(`Update admin with ID: ${userId}`);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box
        mt="40px"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          loading={!membershipList}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          autoHeight
        />
      </Box>
    </Box>
  );
};

export default Pathologists;
