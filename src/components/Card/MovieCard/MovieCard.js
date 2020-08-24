import React, { useContext } from "react";
import { Image } from "../../../components";
import { useCounter } from "../../../hooks";
import { MovieContext } from "../../../screens";
import styles from "./MovieCard.module.scss";

const MovieCard = ({ data }) => {
  const [like, visit, increaseLike, increaseVisit] = useCounter();
  const movieContext = useContext(MovieContext);
  const selectedMovie = movieContext.movie;
  let movies = movieContext.movies;
  console.log("MovieCard : ", data.like);
  const selectMovie = () => {
    increaseVisit();
    movies.find(movie => movie.id === data.id).visit += 1;
    movieContext.updateMovies(movies);
    handleSelection({ ...data, like: like, visit: visit + 1 }, "visit");
  };

  const handleLike = () => {
    increaseLike();
    movies.find(movie => movie.id === data.id).like += 1;
    movieContext.updateMovies(movies);
    if (data.id === selectedMovie.id || !selectedMovie.id) {
      handleSelection(
        { ...selectedMovie, like: like + 1, visit: visit },
        "like"
      );
    }
  };

  const handleSelection = (value, action) => {
    movieContext.selectMovie(value, action);
  };

  return (
    <div
      className={styles.movieCardWrapper}
      onClick={selectMovie}
      onMouseOver={handleLike}
    >
      <div className={styles.imageWrapper}>
        <Image source={data.posterurl} altText={data.title} />
      </div>
      <div className={styles.details}>
        <div className={styles.title}>
          {data.title}
        </div>
        <div className={styles.info}>
          <div className={styles.visit}>{`${visit} Visits`}</div>
          <div className={styles.like}>{`${data.like} Likes`}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
