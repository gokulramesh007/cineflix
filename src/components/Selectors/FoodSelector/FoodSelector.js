import React from "react";
import { Image } from "../../../components";
import { Images } from "../../../constants";
import styles from "./FoodSelector.module.scss";

const FoodSelector = ({ data, selectedItem, handleClick }) => {
  const renderFood = () => {
    let foodList = [];
    if (data.length === 0) {
      foodList.push(<div>No food items available!</div>);
    } else {
      data.forEach((item, index) => {
        foodList.push(
          <div
            className={
              item.value === selectedItem.value
                ? `${styles.foodTile} ${styles.active}`
                : styles.foodTile
            }
            key={item.value}
            onClick={() => handleClick(item)}
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
    return foodList;
  };

  return (
    <div className={styles.foodWrapper}>
      {renderFood()}
    </div>
  );
};

export default React.memo(FoodSelector);
