import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

function Button({ text, size, color, theme, disabled, onClick }) {
  const buttonStyles = `${styles.button} ${styles[color] || ""} ${styles[theme] || ""} ${styles[
    size
  ] || ""}`;
  return (
    <button
      className={buttonStyles}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: "Search",
  color: "yellow",
  theme: "dark",
  size: "",
  disabled: false
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  theme: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button;
