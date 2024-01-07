// old

// import React, { useState } from 'react';
// import { Button} from '@mui/material';
// import axios from 'axios';
// const MalariaDetection = () => {
//   const [image, setImage] = useState(null);
//   const [prediction, setPrediction] = useState(null);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   const handleClassification = async () => {
//     if (!image) return;
  
//     const formData = new FormData();
//     formData.append('file', image);
  
//     console.log('FormData:', formData);
  
//     try {
//       const response = await axios.post("http://localhost:5000/api/classify",formData);

//       console.log('Classification response:', response); // Check the response from the API
//       setPrediction(response.data.prediction);
//     } catch (error) {
//       console.error('Error occurred during image classification:', error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         accept=".png, .jpg, .jpeg"
//         onChange={handleImageUpload}
//       />
//       <Button variant="contained" onClick={handleClassification}>
//         Classify
//       </Button>
//       {prediction && (
//         <div>
//           <h2>Prediction:</h2>
//           <p>{prediction}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MalariaDetection;




import React, { useState } from "react";
import { Button } from "@mui/material";
import { DownloadOutlined } from "@mui/icons-material";
import { useTheme, Box } from "@mui/material";
import Header from "component/Header";
import axios from "axios";




import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MalariaDetection = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);


  const theme = useTheme();
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleClassification = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    console.log("FormData:", formData);

    try {
      const response = await axios.post(
        // "http://localhost:5000/api/classifyMalaria",
        "http://127.0.0.1:5000/api/classifyMalaria",
        formData
      );

      console.log("Classification response:", response); // Check the response from the API
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error occurred during image classification:", error);
    }
    setOpen(true)
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box>
        <Header
          title="Malaria Prediction"
          subtitle="predict the patient is infected with Malaria or not"
        />
        <Box mt="1.5rem">
          <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
            <input
              type="file"
              accept=".png, .jpg, .jpeg, bmp"
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
          >

          {image && (
          <Box mt={4}>
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              width="150"
              height="150"
            />
          </Box>
        )}
        </Box>

        {/* </Box> */}
        <Box mt="1.5rem">
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
      {prediction && (

      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <Header
                title="Prediction Result"
              subtitle={prediction}
              />
            </Typography>
          </Box>
        </Fade>
      </Modal>
      )}
      </Box>
    </Box>
  );
};

export default MalariaDetection;

