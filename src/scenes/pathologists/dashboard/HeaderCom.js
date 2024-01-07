import PropTypes from "prop-types";
import Button from "./Button";
import { useTheme } from "@mui/material";

const HeaderCom = ({ title, onAdd, showAdd }) => {
  // const {theme} = useTheme();
  const theme = useTheme();

  return (
    <headerCom className="header">
      <h1>{title}</h1>
      {/* <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} /> */}
      <Button
        sx={{
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.background.alt,
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        variant="outlined"
        onClick={onAdd}
        text={showAdd ? "Close" : "Add"}
      />
    </headerCom>
  );
};

HeaderCom.defaultProps = {
  title: "Task Tracker",
};

HeaderCom.propTypes = {
  title: PropTypes.string.isRequired,
};

// css in Js
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black',
// }

export default HeaderCom;
