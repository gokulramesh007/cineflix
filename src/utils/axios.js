import axios from "axios";
import APP_CONFIG from "../config/AppConfig";

const appAxios = axios.create({
  baseURL: APP_CONFIG.ROOT_URL
});

export default appAxios;
