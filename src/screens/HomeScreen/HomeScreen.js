import React, { useState, useRef } from "react";
import {
  Booking,
  Button,
  Container,
  Loader,
  LotteryErrorBoundary,
  MovieDescription,
  MovieList,
  Promotions,
  Tile
} from "../../components";
import { MovieContext } from "../../App";
import { Strings } from "../../constants";
import { reserveBooking } from "../../services";
import styles from "./HomeScreen.module.scss";

const HomeScreen = () => {
  const [movie, setMovie] = useState({});
  const [banner, displayBanner] = useState(false);
  const homeScreen = useRef(null);
  const loader = useRef(null);

  const handleSelection = value => {
    console.log("selected movie : ", value);
    changeBackground(Strings.APPLICATION.COLORS.BACKGROUND_TWO);
    setMovie({ ...value, preference: { language: {}, food: {}, parking: {} } });
  };

  const handleBooking = () => {
    loader.current.classList.remove("hide");
    let { language, food, parking } = movie.preference;
    reserveBooking(language.value, food.value, parking.value)
      .then(response => {
        console.log(response);
        if (response.booking === "success") {
          document.body.classList.add("fixed");
          displayBanner(true);
        } else {
          alert("Something went wrong! Please try again later");
          changeBackground(Strings.APPLICATION.COLORS.BACKGROUND_ONE);
          setMovie({});
        }
        loader.current.classList.add("hide");
      })
      .catch(error => {
        loader.current.classList.add("hide");
        console.log(error);
      });
  };

  const handlePreference = value => {
    setMovie(value);
  };

  const reserveMovie = () => {
    console.log("reserve movie : ", movie);
    changeBackground(Strings.APPLICATION.COLORS.BACKGROUND_THREE);
    setMovie({ ...movie, reserved: true });
  };

  const handleNewBooking = () => {
    document.body.classList.remove("fixed");
    changeBackground(Strings.APPLICATION.COLORS.BACKGROUND_ONE);
    displayBanner(false);
    setMovie({});
  };

  const changeBackground = theme => {
    if (homeScreen && homeScreen.current)
      homeScreen.current.style.backgroundColor = theme;
  };

  return (
    <MovieContext.Provider
      value={{
        movie: movie,
        selectMovie: handleSelection,
        updatePreference: handlePreference
      }}
    >
      <div className={styles.homescreenWrapper} ref={homeScreen}>
        <header>
          <span className={styles.logo}>
            Cine<span>FLIX</span>
          </span>
          <div className={styles.phrase}>
            Watch your Favorite Movies on the Big Screen. Just You and your
            Loved Ones!
          </div>
        </header>
        <Container color="pink" padding="tinyPadding">
          <LotteryErrorBoundary>
            <Promotions />
          </LotteryErrorBoundary>
        </Container>
        <div className={styles.movieListWrapper}>
          <div className={styles.tile}>
            <MovieList />
          </div>
          {movie.title &&
            <div className={styles.tile}>
              <Tile
                title={movie.title}
                buttonText="RESERVE NOW"
                handleClick={reserveMovie}
              >
                <MovieDescription data={movie} />
              </Tile>
            </div>}
          {movie.reserved &&
            <div className={styles.lastTile}>
              <Tile
                title="Watch Now"
                type="rightCurve"
                buttonText="CONFIRM"
                handleClick={handleBooking}
              >
                <Booking />
              </Tile>
            </div>}
          {!movie.reserved &&
            <div className={styles.advertisementWrapper}>
              {movie.title
                ? Strings.APPLICATION.ADVERTISEMENT.TWO
                : Strings.APPLICATION.ADVERTISEMENT.ONE}
            </div>}
        </div>
        {banner &&
          <div className={styles.bookingConfirmationBanner}>
            <div className={styles.banner}>
              <div className={styles.title}>Booking Confirmed</div>
              <div className={styles.message}>See you there!</div>
              <Button
                size="tiny"
                text="BOOK ANOTHER"
                onClick={handleNewBooking}
              />
            </div>
          </div>}
      </div>
      <div ref={loader} className="hide">
        <Loader />
      </div>
    </MovieContext.Provider>
  );
};

export default HomeScreen;
