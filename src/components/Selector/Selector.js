import React from "react";
import PropTypes from "prop-types";
import { Image } from "../../components";
import { Images } from "../../constants";
import styles from "./Selector.module.scss";

const Selector = ({ data, type, selectedItem, handleClick }) => {
  const _renderSelectors = () => {
    let selectorList = [];
    if (type === "text") {
      if (data.length === 0) {
        selectorList.push(<div>No Languages available!</div>);
      } else {
        data.forEach((item, index) => {
          selectorList.push(
            <div
              className={
                item.value === selectedItem.value
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
    } else {
      if (data.length === 0) {
        selectorList.push(<div>No options available!</div>);
      } else {
        data.forEach((item, index) => {
          selectorList.push(
            <div
              className={
                item.value === selectedItem.value
                  ? `${styles.imageTile} ${styles.active}`
                  : styles.imageTile
              }
              key={item.value}
              onClick={() => handleClick(item)}
              data-testid="foodSelector"
            >
              <Image
                source={Images[item.value.toUpperCase()]}
                altText={item.label}
                fallbackImage={Images.IMAGE_UNAVAILABLE}
              />
            </div>
          );
        });
      }
    }

    return selectorList;
  };

  return (
    <div className={styles.selectorWrapper}>
      {_renderSelectors()}
    </div>
  );
};

Selector.defaultProps = {
  type: "text",
  data: [],
  selectedItem: {}
};

Selector.propTypes = {
  type: PropTypes.string,
  data: PropTypes.array,
  selectedItem: PropTypes.object
};

export default React.memo(Selector);
