import React from "react";
import { Link } from "react-router-dom";

export function MovieLink({ id, children }) {
  return (
    <Link className="list-group-item list-group-item-action" to={`/movies/${id}`}>
      {children}
    </Link>
  );
}
