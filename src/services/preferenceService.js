import { appAxios } from "../utils";
import { Strings } from "../constants";

export const getBookingPreferences = async () => {
  try {
    const response = await appAxios.get(
      Strings.APPLICATION.END_POINTS.PREFERENCES,
      {}
    );
    return response.data;
  } catch (error) {
    console.log("Error - preferenceService -> getBookingPreferences : ", error);
  }
};
