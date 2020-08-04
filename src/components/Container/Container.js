import React from "react";
import PropTypes from "prop-types";
import styles from "./Container.module.scss";

const Container = ({ color, size, padding, children }) => {
  const containerStyles = `${styles.tripzoneContainer} ${styles[color] ||
    ""} ${styles[size] || ""} ${styles[padding] || ""}`;
  return (
    <div className={containerStyles}>
      {children}
    </div>
  );
};

Container.defaultProps = {
  color: "",
  size: "large",
  padding: ""
};

Container.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  padding: PropTypes.string
};

export default React.memo(Container);
