import React, { useState, useEffect } from "react";
import { MovieLink } from "./movieLink";
import { movieFetch } from "../moviefetch";

export function MovieSuggestions({ id }) {
  const [page, setPage] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const json = await movieFetch(`/movie/${id}/recommendations`, { page });
      if (json.results) {
        setSuggestions(curr => [...curr, ...json.results]);
      }
    };
    fetchData();
  }, [id, page]);
  return suggestions.length !== 0 ? (
    <div>
      Suggestions:
      <ul>
        {suggestions.map(movie => (
          <li>
            <MovieLink id={movie.id}>{movie.title}</MovieLink>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(curr => curr + 1)}>
        Plus de suggestions
      </button>
    </div>
  ) : (
    <div>Pas de suggestions</div>
  );
}
