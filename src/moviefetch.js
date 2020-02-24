export const movieFetch = (path, options) => {
  const URL = "https://api.themoviedb.org/3";
  const API_KEY = "ce1c79d5057dd34527f9ecca16a802a2";
  const withDefaultOptions = {
    language: "fr-FR",
    include_adult: false,
    include_video: false,
    ...options
  };
  const queryParams = Object.keys(withDefaultOptions).reduce(
    (acc, val) => `${acc}&${val}=${withDefaultOptions[val]}`,
    `api_key=${API_KEY}`
  );
  return fetch(`${URL}${path}?${queryParams}`).then(res => res.json());
};
