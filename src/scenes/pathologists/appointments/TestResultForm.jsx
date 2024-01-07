// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   MenuItem,
//   Select,
//   Typography,
//   useTheme,
//   Modal,
// } from "@mui/material";
// import axios from "axios";
// import Header from "component/Header";
// import Fade from "@mui/material/Fade";
// import { DownloadOutlined } from "@mui/icons-material";
// import Backdrop from "@mui/material/Backdrop";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const TestResultForm = ({ selectedAppointment, onClose, open }) => {
//   const theme = useTheme();
//   const [result, setresult] = useState("");
//   const [image, setImage] = useState(null);

//   const [openModal, setOpenModal] = React.useState(false);
//   const handleCloseModal = () => setOpenModal(false);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   const handleClassification = async () => {
//     if (!image) {
//       // Handle case where no image is selected
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("file", image);

//       let apiUrl = "";

//       // Determine the API endpoint based on selectedAppointment.testType
//       if (selectedAppointment.testType === "Leukemia") {
//         apiUrl = "http://127.0.0.1:5001/api/classifyLeukemia";
//       } else if (selectedAppointment.testType === "Malaria") {
//         apiUrl = "http://127.0.0.1:5000/api/classifyMalaria";
//       }

//       const response = await axios.post(apiUrl, formData);

//       // Handle the response as needed
//       console.log("Classification response:", response.data.prediction);
//       setresult(response.data.prediction);
//       setOpenModal(true);
//     } catch (error) {
//       console.error("Error occurred during image classification:", error);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       // Construct the data payload for the POST request
//       const postData = {
//         appointmentId: selectedAppointment.id,
//         firstname: selectedAppointment.firstname,
//         lastname: selectedAppointment.lastname,
//         email: selectedAppointment.email,
//         testName: selectedAppointment.testType,
//         result,
//       };

//       // Make the POST request to your API endpoint
//       const response = await axios.post(
//         "http://localhost:8081/reports/pdf/create-data",
//         postData
//       );

//       // Handle the API response as needed
//       console.log("API Response:", response.data);

//       // Close the form
//       onClose();
//     } catch (error) {
//       // Handle any errors that occur during the POST request
//       console.error("Error saving test information:", error);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Test Information</DialogTitle>
//       <DialogContent>
//         <Box>
//           <Box mt={2}>
//             {/* Existing appointment details */}
//             <Box mt={2}>
//               <Typography>Appointment ID: {selectedAppointment.id}</Typography>
//               <Typography>
//                 patient first name: {selectedAppointment.firstname}
//               </Typography>
//               <Typography>
//                 patient last name: {selectedAppointment.lastname}
//               </Typography>
//               <Typography>Email: {selectedAppointment.email}</Typography>
//               <Typography>TestName: {selectedAppointment.testType}</Typography>
//             </Box>

//             <Box mt="1.5rem">
//               <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
//                 <input
//                   type="file"
//                   accept=".png, .jpg, .jpeg, .bmp, .tif"
//                   id="image-upload"
//                   style={{ display: "none" }}
//                   onChange={handleImageUpload}
//                 />
//                 <Button
//                   variant="contained"
//                   component="span"
//                   sx={{
//                     backgroundColor: theme.palette.secondary.light,
//                     color: theme.palette.background.alt,
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     padding: "10px 20px",
//                   }}
//                 >
//                   Choose Image
//                 </Button>
//               </label>
//             </Box>

//             <Box
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               justifyContent="center"
//             >
//               {image && (
//                 <Box mt={4}>
//                   <img
//                     src={URL.createObjectURL(image)}
//                     alt="Selected"
//                     width="150"
//                     height="150"
//                   />
//                 </Box>
//               )}
//             </Box>

//             <Box mt="1.5rem">
//               <Button
//                 variant="contained"
//                 onClick={handleClassification}
//                 sx={{
//                   backgroundColor: theme.palette.secondary.light,
//                   color: theme.palette.background.alt,
//                   fontSize: "14px",
//                   fontWeight: "bold",
//                   padding: "10px 20px",
//                 }}
//               >
//                 <DownloadOutlined sx={{ mr: "10px" }} />
//                 Classify
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button variant="contained" color="primary" onClick={handleSave}>
//           Save
//         </Button>
//         <Button variant="contained" onClick={onClose} sx={{ marginLeft: 2 }}>
//           Cancel
//         </Button>
//       </DialogActions>

//       {/* Result Modal */}
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         open={openModal}
//         onClose={handleCloseModal}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={openModal}>
//           <Box sx={style}>
//             <Typography variant="h6" component="h2">
//               Classification Result
//             </Typography>
//             <Typography>{result}</Typography>
//           </Box>
//         </Fade>
//       </Modal>
//     </Dialog>
//   );
// };

// export default TestResultForm;

import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  Typography,
  useTheme,
  Modal,
} from "@mui/material";
import { DownloadOutlined } from "@mui/icons-material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300, // Increase the width
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TestResultForm = ({ selectedAppointment, onClose, open }) => {
  const theme = useTheme();
  const [result, setresult] = useState("");
  const [image, setImage] = useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const handleCloseModal = () => setOpenModal(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleClassification = async () => {
    if (!image) {
      // Handle case where no image is selected
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", image);

      let apiUrl = "";

      // Determine the API endpoint based on selectedAppointment.testType
      if (selectedAppointment.testType === "Leukemia") {
        apiUrl = "http://127.0.0.1:5001/api/classifyLeukemia";
      } else if (selectedAppointment.testType === "Malaria") {
        apiUrl = "http://127.0.0.1:5000/api/classifyMalaria";
      }
      console.log(apiUrl);
      const response = await axios.post(apiUrl, formData);

      // Handle the response as needed
      console.log("Classification response:", response.data.prediction);
      setresult(response.data.prediction);
      setOpenModal(true);
    } catch (error) {
      console.error("Error occurred during image classification:", error);
    }
  };

  const handleSave = async () => {
    try {
      // Construct the data payload for the POST request
      const postData = {
        appointmentId: selectedAppointment.id,
        firstname: selectedAppointment.firstname,
        lastname: selectedAppointment.lastname,
        email: selectedAppointment.email,
        testName: selectedAppointment.testType,
        result,
      };

      // Make the POST request to your API endpoint
      const response = await axios.post(
        "http://localhost:8081/reports/pdf/create-data",
        postData
      );

      // Handle the API response as needed
      console.log("API Response:", response.data);

      // Close the form
      onClose();
    } catch (error) {
      // Handle any errors that occur during the POST request
      console.error("Error saving test information:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Test Information</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 3 }}>
          {" "}
          {/* Add padding */}
          <Box mt={2}>
            {/* Existing appointment details */}
            <Box mt={2}>
              <Typography sx={{ fontWeight: "bold" }}>
                Appointment ID: {selectedAppointment.id}
              </Typography>
              <Typography>
                patient name: {selectedAppointment.firstname}
                {selectedAppointment.lastname}
              </Typography>
              {/* <Typography>
                patient last name: {selectedAppointment.lastname}
              </Typography> */}
              <Typography>Email: {selectedAppointment.email}</Typography>
              <Typography>TestName: {selectedAppointment.testType}</Typography>
            </Box>

            <Box mt={2}>
              <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg, .bmp, .tif"
                  id="image-upload"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    backgroundColor: theme.palette.secondary.light,
                    color: theme.palette.background.alt,
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                >
                  Choose Image
                </Button>
              </label>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              mt={2}
            >
              {image && (
                <Box mt={2}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Selected"
                    width="200" // Adjust image width
                    height="200" // Adjust image height
                  />
                </Box>
              )}
            </Box>

            <Box mt={2}>
              <Button
                variant="contained"
                onClick={handleClassification}
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.background.alt,
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                <DownloadOutlined sx={{ mr: "10px" }} />
                Classify
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="contained" onClick={onClose} sx={{ marginLeft: 2 }}>
          Cancel
        </Button>
      </DialogActions>

      {/* Result Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
              Classification Result
            </Typography>
            <Typography>{result}</Typography>
          </Box>
        </Fade>
      </Modal>
    </Dialog>
  );
};

export default TestResultForm;
