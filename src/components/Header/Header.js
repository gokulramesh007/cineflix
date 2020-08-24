import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header>
      <span className={styles.logo}>
        Cine<span>FLIX</span>
      </span>
      <div className={styles.phrase}>
        Watch your Favorite Movies on the Big Screen. Just You and your Loved
        Ones!
      </div>
    </header>
  );
};

export default Header;
