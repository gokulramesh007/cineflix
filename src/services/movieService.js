import { appAxios } from "../utils";
import { Strings } from "../constants";

export const getMovies = async pageNo => {
  try {
    pageNo = pageNo || 1;
    const response = await appAxios.get(Strings.APPLICATION.END_POINTS.MOVIES, {
      params: {
        page: pageNo
      }
    });
    response.data.forEach(item => {
      item.id = item.title + item.year;
    });
    return response.data;
  } catch (error) {
    console.log("Error - movieService -> getMovies : ", error);
  }
};
