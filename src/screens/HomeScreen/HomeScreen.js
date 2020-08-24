import React, { lazy, Suspense, useState, useRef } from "react";
import {
  Container,
  Header,
  Loader,
  LotteryErrorBoundary,
  MovieList,
  Promotions
} from "../../components";
import { Strings } from "../../constants";
import styles from "./HomeScreen.module.scss";

export const MovieContext = React.createContext({});

export const HomeScreen = () => {
  const [movie, setMovie] = useState({});
  const [movies, setMovies] = useState([]);
  const [banner, displayBanner] = useState(false);
  const homeScreen = useRef(null);
  const loader = useRef(null);
  const MovieDescription = lazy(
    () =>
      // new Promise((resolve, reject) =>
      //   setTimeout(
      //     () =>
      //       resolve(
              import("../../components/Pages/MovieDescription/MovieDescription")
      //       ),
      //     1000
      //   )
      // )
  );
  const Booking = lazy(() => import("../../components/Pages/Booking/Booking"));
  const ConfirmationBanner = lazy(() =>
    import("../../components/ConfirmationBanner/ConfirmationBanner")
  );

  const handleSelection = (value, action) => {
    if (action === "visit") {
      //console.log("selected movie : ", value);
      changeBackground(Strings.APPLICATION.COLORS.BACKGROUND_TWO);
    }
    //console.log("liked movie : ", value);
    setMovie({ ...value, preference: { language: {}, food: {}, parking: {} } });
  };

  const handlePreference = value => {
    setMovie(value);
  };

  const handleMovies = value => {
    //console.log("handleMovies : ", value);
    setMovies(value);
  };

  const changeBackground = theme => {
    if (homeScreen && homeScreen.current)
      homeScreen.current.style.backgroundColor = theme;
  };

  return (
    <div className={styles.homescreenWrapper} ref={homeScreen}>
      <Header />
      <Container color="pink" padding="tinyPadding">
        <LotteryErrorBoundary>
          <Promotions />
        </LotteryErrorBoundary>
      </Container>
      <div className={styles.movieListWrapper}>
        <MovieContext.Provider
          value={{
            movie: movie,
            movies: movies,
            selectMovie: handleSelection,
            updatePreference: handlePreference,
            updateMovies: handleMovies
          }}
        >
          <div className={styles.tile}>
            <MovieList />
          </div>

          <Suspense fallback={<Loader />}>
            {MovieDescription &&
              movie.title &&
              <div className={styles.tile}>
                <MovieDescription
                  data={movie}
                  bookMovie={value => {
                    setMovie(value);
                    changeBackground(
                      Strings.APPLICATION.COLORS.BACKGROUND_THREE
                    );
                  }}
                />
              </div>}
            {movie.reserved &&
              <div className={styles.lastTile}>
                <Booking
                  movie={movie}
                  displayBanner={value => displayBanner(value)}
                  bookingConfirmed={() => {
                    changeBackground(Strings.APPLICATION.COLORS.BACKGROUND_ONE);
                    setMovie({});
                  }}
                />
              </div>}
          </Suspense>
          {!movie.reserved &&
            <div className={styles.advertisementWrapper}>
              {movie.title
                ? Strings.APPLICATION.ADVERTISEMENT.TWO
                : Strings.APPLICATION.ADVERTISEMENT.ONE}
            </div>}
        </MovieContext.Provider>
      </div>
      {banner &&
        <Suspense fallback={<Loader />}>
          <ConfirmationBanner
            handleBanner={() => {
              changeBackground(Strings.APPLICATION.COLORS.BACKGROUND_ONE);
              displayBanner(false);
              setMovie({});
            }}
          />
        </Suspense>}
      <div ref={loader} className="hide">
        <Loader />
      </div>
    </div>
  );
};
