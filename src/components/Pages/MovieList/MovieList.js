import React, { useContext, useEffect, useRef, useState } from "react";
import { Loader, MoviesList, Tile } from "../../../components";
import { movieService } from "../../../services";
import { MovieContext } from "../../../screens";
import styles from "./MovieList.module.scss";

const MovieList = () => {
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const movieContext = useContext(MovieContext);
  let movies = movieContext.movies;
  const loadMoreMovies = () => {
    setPage(page => page + 1);
  };

  const _fetchMovies = async () => {
    loader.current && loader.current.classList.remove("hide");
    try {
      let response = await movieService.getMovies(page);
      movieContext.updateMovies([...movies, ...response]);
      loader.current.classList.add("hide");
    } catch (error) {
      console.error(error);
      loader.current && loader.current.classList.add("hide");
    }
  };

  useEffect(
    () => {
      _fetchMovies();
    },
    [page]
  );
  
  return (
    <Tile
      title="All Movies"
      buttonText="LOAD MORE"
      handleClick={() => loadMoreMovies()}
    >
      <div className={styles.movieListWrapper}>
        <MoviesList data={movies} />
      </div>
      <div ref={loader}>
        <Loader />
      </div>
    </Tile>
  );
};

export default MovieList;
