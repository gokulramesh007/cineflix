import React from "react";
import PropTypes from "prop-types";
import { Button } from "../../components";
import styles from "./Tile.module.scss";

const Tile = ({ buttonText, children, title, type, handleClick }) => {
  const tileWrapper = `${styles.tileWrapper} ${styles[type]}`;
  return (
    <div className={tileWrapper}>
      <div className={styles.title}>
        {title}
      </div>
      {children}
      <div className={styles.buttonWrapper}>
        <Button size="custom" text={buttonText} onClick={handleClick} />
      </div>
    </div>
  );
};

Tile.defaultProps = {
  buttonText: "",
  title: "",
  type: ""
};

Tile.propTypes = {
  buttonText: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string
};

export default React.memo(Tile);
