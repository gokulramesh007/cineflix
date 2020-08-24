import React from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../../../components";
import "./MoviesList.scss";

const MoviesList = ({ column, data }) => {
  const _renderMovieTiles = () => {
    let productList = [];
    data.forEach(item => {
      productList.push(
        <div className="tiles" key={item.id}>
          <MovieCard data={item} />
        </div>
      );
    });
    return productList;
  };

  return (
    <div className={`product-list-wrapper ${column}`}>
      {_renderMovieTiles()}
    </div>
  );
};

MoviesList.defaultProps = {
  data: [],
  column: "two"
};

MoviesList.propTypes = {
  data: PropTypes.array.isRequired,
  column: PropTypes.string
};

export default MoviesList;
