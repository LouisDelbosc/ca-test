import React from 'react';
import {useFetchMovie} from "../hooks/useFetchMovie";

export function Welcome(props) {
  const [movies, _setMovies] = useFetchMovie();
  return (
      <div>
        <h1>Welcome</h1>
        <h3>Latest movies</h3>
        <ul>
          {movies && movies.map((movie) => <li key={movie.id}>{movie.title}</li>)}
        </ul>
      </div>
  );
}
