import { appAxios } from "../utils";
import { Strings } from "../constants";

export const checkForPrize = async mobileNo => {
  let response;
  try {
    response = await appAxios.get(
      Strings.APPLICATION.END_POINTS.LOTTERY,
      {
        params: {
          mobile: mobileNo
        }
      }
    );
  } catch (error) {
    console.log("Error - lotteryService -> checkForPrize : ", error);
  }
  if (response.data === "") throw new Error("Something went wrong!");
  return response.data;
};
