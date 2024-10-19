import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import Search from "./Components/Search";
import NumResults from "./Components/NumResults";
import Main from "./Components/Main";
import Box from "./Components/Box";
import Loader from "./Components/Loader";
import ErrorMessage from "./Components/ErrorMessage";
import MovieDetails from "./Components/MovieDetails";
import MovieList from "./Components/MovieList";
import WatchedSummery from "./Components/WatchSummery";
import WatchedMovieList from "./Components/WatchedMovieList";
import { useMovies } from "./Hooks/useMovies";
import { useLocalStorage } from "./Hooks/useLocalStorage";

const KEY = "276bfff3";
export const API_URL = `http://www.omdbapi.com/?apikey=${KEY}`;

export default function App() {
    const [selectedId, setSelectedId] = useState(null);
    const [query, setQuery] = useState("hero");
    const { movies, isLoading, error } = useMovies(query);
    const [watched, setWatched] = useLocalStorage({}, "watched");

    function handleSelectMovie(id) {
        setSelectedId((currId) => (id === currId ? null : id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatched(movie) {
        setWatched((watched) => {
            return { ...watched, [movie.imdbID]: movie };
        });
    }

    function handleRemoveWatched(id) {
        return setWatched((watched) => {
            delete watched[id];
            return { ...watched };
        });
    }

    return (
        <>
            <NavBar movies={movies}>
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </NavBar>

            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MovieList
                            onSelectMovie={handleSelectMovie}
                            movies={movies}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>

                <Box>
                    {selectedId ? (
                        <MovieDetails
                            onCloseMovie={handleCloseMovie}
                            selectedId={selectedId}
                            onAddWatched={handleAddWatched}
                            onRemoveWatched={handleRemoveWatched}
                            watched={watched}
                            key={selectedId}
                        />
                    ) : (
                        <>
                            <WatchedSummery watched={watched} />
                            <WatchedMovieList
                                watched={watched}
                                onRemoveWatched={handleRemoveWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
