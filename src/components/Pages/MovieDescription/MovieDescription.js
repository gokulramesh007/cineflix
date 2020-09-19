import React, { useContext } from "react";
import { Image, Tile } from "../../../components";
import { Images } from "../../../constants";
import { MovieContext } from "../../../screens";

import styles from "./MovieDescription.module.scss";

const MovieDescription = ({ data, bookMovie }) => {
  const movieContext = useContext(MovieContext);

  const reserveMovie = () => {
    console.log("reserve movie : ", data);
    bookMovie({ ...data, reserved: true });
  };

  const handleClick = () => {
    let like = data.like;
    movieContext.selectMovie({ ...data, like: like + 1 });
    let movies = movieContext.movies;
    movies.find(movie => movie.id === data.id).like += 1;
    movieContext.updateMovies(movies);
  };

  return (
    <Tile
      title={data.title}
      buttonText="RESERVE NOW"
      handleClick={reserveMovie}
    >
      <div className={styles.movieDescWrapper}>
        <div className={styles.likeWrapper} onClick={handleClick}>
          <Image source={Images.LIKE} altText="Like" />
        </div>
        <div className={styles.viewsWrapper}>
          <div>{`You viewed this movie ${data.visit} times.`}</div>
          <div>{`You loved this movie ${data.like} times.`}</div>
        </div>
        <div className={styles.description}>
          {data.storyline}
        </div>
        <div className={styles.title}>Actors</div>
        <div className={styles.actors}>
          {data.actors.join(", ")}
        </div>
        <div className={styles.imageWrapper}>
          <Image source={data.posterurl} altText={data.title} />
        </div>
      </div>
    </Tile>
  );
};

export default React.memo(MovieDescription);
