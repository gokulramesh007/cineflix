import React, { useContext, useEffect, useRef, useState } from "react";
import { Loader, MoviesList, Tile } from "../../../components";
import { getMovies } from "../../../services";
import { MovieContext } from "../../../App";
import styles from "./MovieList.module.scss";

const MovieList = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const selectedMovie = useContext(MovieContext);
  const loader = useRef(null);
  const loadMoreMovies = () => {
    setPage(page => page + 1);
  };

  const _fetchMovies = () => {
    loader.current.classList.remove("hide");
    getMovies(page)
      .then(response => {
        //console.log([...movies, ...response]);
        setMovies([...movies, ...response]);
        loader.current.classList.add("hide");
      })
      .catch(error => {
        console.error(error);
        loader.current.classList.add("hide");
      });
  };

  useEffect(
    () => {
      _fetchMovies();
    },
    [page]
  );

  const handleSelection = value => {
    selectedMovie.selectMovie(value);
  };

  return (
    <Tile
      title="All Movies"
      buttonText="LOAD MORE"
      handleClick={() => loadMoreMovies()}
    >
      <div className={styles.movieListWrapper}>
        <MoviesList data={movies} handleSelection={handleSelection} />
      </div>
      <div ref={loader}>
        <Loader />
      </div>
    </Tile>
  );
};

export default React.memo(MovieList);
