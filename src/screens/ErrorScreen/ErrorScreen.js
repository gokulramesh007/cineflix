import React from "react";
import { Image } from "../../components";
import { Images, Strings } from "../../constants";
import { Link } from "react-router-dom";
import { errorpageWrapper, errorpageContents, imageWrapper } from "./ErrorScreen.module.scss";

function ErrorScreen() {
  return (
    <div className={errorpageWrapper}>
      <div className={errorpageContents}>
        <div className={imageWrapper}>
          <Image source={Images.ERROR} altText="404 - Error" />
        </div>
        <Link to={Strings.APPLICATION.ROUTES.HOME}>Go to Home Page</Link>
      </div>
    </div>
  );
}

export default ErrorScreen;
