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

const KEY = "276bfff3";
export const API_URL = `http://www.omdbapi.com/?apikey=${KEY}`;

export default function App() {
    const [selectedId, setSelectedId] = useState(null);
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    function handleSelectMovie(id) {
        setSelectedId((currId) => (id === currId ? null : id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatched(movie) {
        return setWatched((watched) => {
            watched[movie.imdbID] = movie;
            return { ...watched };
        });
    }

    function handleRemoveWatched(id) {
        return setWatched((watched) => {
            delete watched[id];
            return { ...watched };
        });
    }

    useEffect(
        function () {
            const controller = new AbortController();
            async function fetchMovies(searchQuery) {
                try {
                    setIsLoading(true);
                    setError("");
                    const res = await fetch(`${API_URL}&s=${searchQuery}`, {
                        signal: controller.signal,
                    });

                    if (!res.ok)
                        throw new Error(
                            "Something went wrong with fetching movies"
                        );

                    const data = await res.json();

                    if (data.Response === "False")
                        throw new Error("No movie found !");
                    setMovies(data.Search || []);
                } catch (error) {
                    if (error.name !== "AbortError") {
                        setError(error.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            }

            if (query.length < 3) {
                setMovies([]);
                setError("");
                return;
            }

            handleCloseMovie();
            fetchMovies(query);

            return function () {
                controller.abort();
            };
        },
        [query]
    );

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
