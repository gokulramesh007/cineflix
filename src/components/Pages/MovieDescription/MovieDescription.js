import React from "react";
import { Image } from "../../../components";
import styles from "./MovieDescription.module.scss";

const MovieDescription = ({ data }) => {
  console.log("Movie description : ", data);
  return (
    <div className={styles.movieDescWrapper}>
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
  );
};

export default React.memo(MovieDescription);
