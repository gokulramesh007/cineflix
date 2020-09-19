import React, { useContext, useEffect, useRef, useState } from "react";
import { Loader, Selector, Tile } from "../../../components";
import { reserveService } from "../../../services";
import { MovieContext } from "../../../screens";
import styles from "./Booking.module.scss";

const Booking = ({ movie, displayBanner, bookingConfirmed }) => {
  const [details, setdetails] = useState();
  const selectedMovie = useContext(MovieContext);
  const items = selectedMovie.movie;
  const loader = useRef(null);

  const _fetchPreference = async () => {
    try {
      let response = await reserveService.getBookingPreferences();
      setdetails(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = () => {
    loader.current.classList.remove("hide");
    let { language, food, parking } = movie.preference;
    reserveService
      .reserveBooking(language.value, food.value, parking.value)
      .then(response => {
        console.log(response);
        if (response.booking === "success") {
          document.body.classList.add("fixed");
          displayBanner(true);
        } else {
          alert("Something went wrong! Please try again later");
          bookingConfirmed();
        }
        loader.current.classList.add("hide");
      })
      .catch(error => {
        loader.current.classList.add("hide");
        console.log(error);
      });
  };

  useEffect(() => {
    _fetchPreference();
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
    <Tile
      title="Watch Now"
      type="rightCurve"
      buttonText="CONFIRM"
      handleClick={handleBooking}
    >
      <div className={styles.bookingWrapper}>
        <div className={styles.title}>Choose Language</div>
        {details &&
          <Selector
            data={details.languages}
            handleClick={selectLanguage}
            selectedItem={items.preference.language}
          />}
        <div className={styles.title}>Choose Food</div>
        {details &&
          <div data-testid="foodSelector">
            <Selector
              type="image"
              data={details.food}
              selectedItem={items.preference.food}
              handleClick={selectFood}
            />
          </div>}
        <div className={styles.title}>Choose Parking</div>
        {details &&
          <Selector
            type="image"
            data={details.parking}
            selectedItem={items.preference.parking}
            handleClick={selectParking}
          />}
      </div>
      <div ref={loader} className="hide">
        <Loader />
      </div>
    </Tile>
  );
};

export default React.memo(Booking);
