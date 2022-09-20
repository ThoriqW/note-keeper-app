import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://stormy-dawn-73593.herokuapp.com/",
});
