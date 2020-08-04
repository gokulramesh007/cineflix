import React from "react";
import { Image } from "../../../components";
import { useCounter } from "../../../hooks";
import styles from "./MovieCard.module.scss";

const MovieCard = ({ data, handleSelection }) => {
  const [like, visit, increaseLike, increaseVisit] = useCounter();
  const selectMovie = () => {
    increaseVisit();
    handleSelection({ ...data, like: like, visit: visit });
  };

  return (
    <div
      className={styles.movieCardWrapper}
      onClick={selectMovie}
      onMouseOver={increaseLike}
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
          <div className={styles.like}>{`${like} Likes`}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MovieCard);
