import React, { useContext, useEffect, useState } from "react";
import {
  FoodSelector,
  LanguageSelector,
  ParkingSelector
} from "../../../components";
import { getBookingPreferences } from "../../../services";
import { MovieContext } from "../../../App";
import styles from "./Booking.module.scss";

const Booking = () => {
  const [details, setdetails] = useState();
  const selectedMovie = useContext(MovieContext);
  const items = selectedMovie.movie;

  useEffect(() => {
    getBookingPreferences()
      .then(response => {
        console.log(response);
        setdetails(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const selectLanguage = value => {
    let preference = { ...items.preference, language: value };
    selectedMovie.updatePreference({ ...items, preference });
  };

  const selectFood = value => {
    let preference = { ...items.preference, food: value };
    selectedMovie.updatePreference({ ...items, preference });
  };

  const selectParking = value => {
    let preference = { ...items.preference, parking: value };
    selectedMovie.updatePreference({ ...items, preference });
  };

  console.log("items : ", items);
  return (
    <div className={styles.bookingWrapper}>
      <div className={styles.title}>Choose Language</div>
      {details &&
        <LanguageSelector
          data={details.languages}
          handleClick={selectLanguage}
          selectedLanguage={items.preference.language}
        />}
      <div className={styles.title}>Choose Food</div>
      {details &&
        <FoodSelector
          data={details.food}
          selectedItem={items.preference.food}
          handleClick={selectFood}
        />}
      <div className={styles.title}>Choose Parking</div>
      {details &&
        <ParkingSelector
          data={details.parking}
          selectedParking={items.preference.parking}
          handleClick={selectParking}
        />}
    </div>
  );
};

export default React.memo(Booking);
