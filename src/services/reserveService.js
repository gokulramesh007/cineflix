import { appAxios } from "../utils";
import { Strings } from "../constants";

export default class reserveService{
  static getBookingPreferences = async () => {
    try {
      const response = await appAxios.get(
        Strings.APPLICATION.END_POINTS.PREFERENCES,
        {}
      );
      return response.data;
    } catch (error) {
      console.log("Error - reserveService -> getBookingPreferences : ", error);
    }
  };

  static reserveBooking = async (language, food, parking) => {
    try {
      const response = await appAxios.get(
        Strings.APPLICATION.END_POINTS.BOOK,
        {
          params: {
            language: language,
            food: food,
            parking: parking
          }
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error - reserveService -> reserveBooking : ", error);
    }
  };
}