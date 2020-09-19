import React from "react";
import { Button } from "../../components";
import styles from "./ConfirmationBanner.module.scss";

const ConfirmationBanner = ({ handleBanner }) => {
  const handleNewBooking = () => {
    document.body.classList.remove("fixed");
    handleBanner();
  };

  return (
    <div className={styles.bookingConfirmationBanner}>
      <div className={styles.banner}>
        <div className={styles.title}>Booking Confirmed</div>
        <div className={styles.message}>See you there!</div>
        <Button size="tiny" text="BOOK ANOTHER" onClick={handleNewBooking} />
      </div>
    </div>
  );
};

export default React.memo(ConfirmationBanner);
