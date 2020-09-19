import React from "react";
import { Images } from "../../constants";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <img src={Images.LOADER} alt="Loading..." />
      </div>
    </div>
  );
};

export default React.memo(Loader);
