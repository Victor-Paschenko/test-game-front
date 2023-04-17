import React from "react";
import PropTypes from "prop-types";
import classes from "./Cell.module.css";

const Cell = ({ type, onClick }) => {
  const classNames = [type === "GREEN" ? classes.green : classes.red];
  return (
    <div
      className={[...classNames, classes.cell].join(" ")}
      onClick={onClick}
    ></div>
  );
};

Cell.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["GREEN", "RED"]).isRequired,
};

export default Cell;
