import React from "react";
import { Image } from "../../../components";
import { Images } from "../../../constants";
import styles from "./ParkingSelector.module.scss";

const ParkingSelector = ({ data, selectedParking, handleClick }) => {
  const renderParking = () => {
    let parkingList = [];
    if (data.length === 0) {
      parkingList.push(<div>No food items available!</div>);
    } else {
      data.forEach((item, index) => {
        parkingList.push(
          <div
            className={
              item.value === selectedParking.value
                ? `${styles.parkingTile} ${styles.active}`
                : styles.parkingTile
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
    return parkingList;
  };

  return (
    <div className={styles.parkingWrapper}>
      {renderParking()}
    </div>
  );
};

export default React.memo(ParkingSelector);
