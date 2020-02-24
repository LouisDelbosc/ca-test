import React from "react";
import { Link } from "react-router-dom";

export function MovieLink({ id, children }) {
  return <Link to={`/movies/${id}`}>{children}</Link>;
}
