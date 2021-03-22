import "./styles/global.scss";

import { useCallback, useEffect, useState } from "react";

import { Content } from "./components/Content";
import { SideBar } from "./components/SideBar";
import { GenreResponse } from "./models/genreResponse";
import { MovieResponse } from "./models/movieResponse";
import { api } from "./services/api";

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponse[]>([]);
  const [movies, setMovies] = useState<MovieResponse[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<GenreResponse>(
    {} as GenreResponse
  );

  useEffect(() => {
    api.get<GenreResponse[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieResponse[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api.get<GenreResponse>(`genres/${selectedGenreId}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        handleClickButton={handleClickButton}
      />
      <Content selectedGenre={selectedGenre} movies={movies} />
    </div>
  );
}
