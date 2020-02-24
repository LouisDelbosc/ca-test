import React, { useState, useEffect, useRef } from "react";
import { MovieLink } from "./movieLink";
import { movieFetch } from "../moviefetch";

export function MovieSuggestions({ id }) {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const refId = useRef(id);
  useEffect(() => {
    const fetchData = async () => {
      if (refId.current !== id) {
        const json = await movieFetch(`/movie/${id}/recommendations`, {
          page: 1
        });
        setMaxPage(page === json.total_pages);
        if (json.results) {
          setSuggestions(json.results);
        }
      } else {
        const json = await movieFetch(`/movie/${id}/recommendations`, { page });
        setMaxPage(page === json.total_pages);
        if (json.results) {
          setSuggestions(curr => [...curr, ...json.results]);
        }
      }
      refId.current = id;
    };
    fetchData();
  }, [id, page]);
  return suggestions.length !== 0 ? (
    <div>
      Suggestions:
      <ul>
        {suggestions.map(movie => (
          <li key={movie.id}>
            <MovieLink id={movie.id}>{movie.title}</MovieLink>
          </li>
        ))}
      </ul>
      {!maxPage ? (
        <button onClick={() => setPage(curr => curr + 1)}>
          Plus de suggestions
        </button>
      ) : null}
    </div>
  ) : (
    <div>Pas de suggestions</div>
  );
}
