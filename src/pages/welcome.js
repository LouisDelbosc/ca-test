import React, { useState } from "react";
import { useFetchMovie } from "../hooks/useFetchMovie";
import { Link } from "react-router-dom";

export function Welcome(props) {
  const [isAsc, setAsc] = useState(false);
  const options = {
    sort_by: `primary_release_date.${isAsc ? "asc" : "desc"}`
  };
  const [movies, _setMovies] = useFetchMovie(options);
  return (
    <div>
      <h1>Welcome</h1>
      <h3>Latest movies</h3>
      <button onClick={() => setAsc(curr => !curr)}>
        {isAsc ? "first" : "latest"}
      </button>
      <ul>
        {movies &&
          movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
