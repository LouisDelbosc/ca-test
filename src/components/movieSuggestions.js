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
    <div className="container col-6">
      <div className="card">
        <h5 className="card-header">Suggestions:</h5>
        <div className="card-body">
          <div className="card-text list-group list-group-flush">
            {suggestions.map(movie => (
              <MovieLink key={movie.id} id={movie.id}>
                {movie.title}
              </MovieLink>
            ))}
          </div>
        </div>
        {!maxPage ? (
          <div className="card-footer">
            <button className="btn btn-primary" onClick={() => setPage(curr => curr + 1)}>
              Plus de suggestions
            </button>
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <div>Pas de suggestions</div>
  );
}
