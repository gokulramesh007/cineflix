import React from "react";
import styles from "./LanguageSelector.module.scss";

const LanguageSelector = ({ data, selectedLanguage, handleClick }) => {
  const renderLanguages = () => {
    let languageList = [];
    if (data.length === 0) {
      languageList.push(<div>No Languages available!</div>);
    } else {
      data.forEach((item, index) => {
        languageList.push(
          <div
            className={
              item.value === selectedLanguage.value
                ? `${styles.languageTile} ${styles.active}`
                : styles.languageTile
            }
            key={item.value}
            onClick={() => handleClick(item)}
          >
            <div className={styles.language}>
              {item.label}
            </div>
          </div>
        );
      });
    }
    return languageList;
  };
  return (
    <div className={styles.languageWrapper}>
      {renderLanguages()}
    </div>
  );
};

export default React.memo(LanguageSelector);
