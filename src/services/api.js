import axios from "axios";

//base da url

//https://api.themoviedb.org/3/movie/550?api_key=7c2648c14a71133c026e52e8531ca450

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
