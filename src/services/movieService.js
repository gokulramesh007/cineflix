import { appAxios } from "../utils";
import { Strings } from "../constants";

export const getMovies = async pageNo => {
  try {
    const response = await appAxios.get(Strings.APPLICATION.END_POINTS.MOVIES, {
      params: {
        page: pageNo
      }
    });
    return response.data;
  } catch (error) {
    console.log("Error - movieService -> getMovies : ", error);
  }
};
