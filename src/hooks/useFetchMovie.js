import {useState, useEffect} from "react";
import {movieFetch} from "../moviefetch";

function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month > 9 ? month : `0${month}`, day > 9 ? day : `0{day}`].join("-");
}

export function useFetchMovie(options) {
  const [movies, setMovies] = useState([]);
  const withDefaultOptions = {
    sort_by: "primary_release_date.desc",
    "primary_release_date.lte": getToday(),
    ...(options || {}),
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await movieFetch("/discover/movie", withDefaultOptions || {});
      setMovies(result.results);
    };
    fetchData();
  }, []);
  return [movies, setMovies];
}
