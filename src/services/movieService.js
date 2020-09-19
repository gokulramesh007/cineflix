import { appAxios } from "../utils";
import { Strings } from "../constants";

export default class movieService {
  static getMovies = async pageNo => {
    try {
      pageNo = pageNo || 1;
      const response = await appAxios.get(
        Strings.APPLICATION.END_POINTS.MOVIES,
        {
          params: {
            page: pageNo
          }
        }
      );
      response.data.forEach(item => {
        item.id = item.title + item.year;
        item.like = 0;
        item.visit = 0;
      });
      return response.data;
    } catch (error) {
      console.log("Error - movieService -> getMovies : ", error);
    }
  };
}
