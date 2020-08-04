import { useReducer } from "react";
import { Messages } from "../../constants";

const initialState = {
  isLoading: true,
  error: "",
  response: ""
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
      return {
        isLoading: false,
        error: "",
        response: `Hurray you won ${action.payload} off on your booking`
      };
    case "FAILURE":
      return {
        isLoading: false,
        error: Messages.PROMOTIONS.ERROR,
        response: ""
      };
    default:
      return state;
  }
};

const useLotteryReducer = () => {
  return useReducer(reducer, initialState);
};

export default useLotteryReducer;
