// import PropTypes from "prop-types";

// const Button = ({ color, text, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       style={{ backgroundColor: color }}
//       className="btn"
//     >
//       {text}
//     </button>
//   );
// };

// Button.defaultProps = {
//   color: "steelblue",
// };

// Button.propTypes = {
//   text: PropTypes.string,
//   color: PropTypes.string,
//   onClick: PropTypes.func,
// };

// export default Button;
import React from "react";
import PropTypes from "prop-types";
import { Button as MUIButton } from "@mui/material";

const Button = ({ color, text, onClick }) => {
  return (
    <MUIButton
      onClick={onClick}
      variant="contained"
      color={color}
      size="medium"
    >
      {text}
    </MUIButton>
  );
};

Button.defaultProps = {
  color: "primary",
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
