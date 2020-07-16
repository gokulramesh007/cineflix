import { appAxios } from "../utils";
import { Strings } from "../constants";

export const checkForPrize = async mobileNo => {
  try {
    const response = await appAxios.get(
      Strings.APPLICATION.END_POINTS.LOTTERY,
      {
        params: {
          mobile: mobileNo
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error - lotteryService -> checkForPrize : ", error);
  }
};
