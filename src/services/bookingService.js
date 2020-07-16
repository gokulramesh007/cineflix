import { appAxios } from "../utils";
import { Strings } from "../constants";

export const reserveBooking = async (language, food, parking) => {
  try {
    const response = await appAxios.get(
      Strings.APPLICATION.END_POINTS.LOTTERY,
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
    console.log("Error - bookingService -> reserveBooking : ", error);
  }
};
