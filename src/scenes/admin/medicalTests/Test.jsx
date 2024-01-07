import React from "react";
import {
  Card,
  Button,
  useTheme,
  Dialog,
  DialogActions,
  Typography,
  CardActions,
  CardContent,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
// import TestUpdateDialog from "./TestUpdateDialog";
import UpdateMedicalTestDialog from "./UpdateMedicalTestDialog";

const Test = ({ _id, name, price, description, category, refetchTests }) => {
  // console.log(_id);
  const theme = useTheme();
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const [selectedTestId, setSelectedTestId] = React.useState(null);

  const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
  const [selectedTest, setSelectedTest] = React.useState(null);

  const handleConfirmDialogOpen = (TestId) => {
    // console.log(TestId);
    setSelectedTestId(TestId);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
    setSelectedTestId(null);
  };

  const handleDeleteTest = async (TestId) => {
    // console.log("Test id: in handle delete test ", TestId);
    try {
      setConfirmDialogOpen(true);
      // console.log(TestId);
      await axios.delete(`http://localhost:8081/api/tests/delete/${TestId}`);
      setSelectedTestId(null);
      refetchTests();
      setConfirmDialogOpen(false);
    } catch (error) {
      console.error("Error deleting Test:", error);
    }
  };

  // const handleUpdateTest = (Test) => {
  //   setSelectedTest(Test);
  //   setUpdateDialogOpen(true);
  // };
  const handleUpdateTest = (Test) => {
    // console.log("handleUpdateTest 1", Test);
    setSelectedTest(Test);
    setUpdateDialogOpen(true);
  };

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: 14,
            display: "flex",
            justifyContent: "space-between",
          }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          <span>{category.name}</span>
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{name}</span>
          <Typography variant="h5">{price} pkr</Typography>
        </Typography>

        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          {category.description}
        </Typography>

        <Typography variant="body2">{description}</Typography>
      </CardContent>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CardActions>
          <Button
            variant="primary"
            size="small"
            onClick={() => handleConfirmDialogOpen(_id)}
          >
            Delete
          </Button>
        </CardActions>

        {/* <CardActions>
          <Button
            variant="primary"
            size="small"
            onClick={() => handleUpdateTest(_id)}
          >
            Update
          </Button>
        </CardActions> */}
        <CardActions>
          <Button
            variant="primary"
            size="small"
            onClick={() =>
              handleUpdateTest({ _id, name, price, description, category })
            }
          >
            Update
          </Button>
        </CardActions>
      </div>

      <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this Test information?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteTest(selectedTestId)}
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <UpdateMedicalTestDialog
        open={updateDialogOpen}
        handleClose={() => setUpdateDialogOpen(false)}
        selectedTest={selectedTest} // Pass the entire selectedTest object
        refetchTests={refetchTests}
      />
    </Card>
  );
};

export default Test;
