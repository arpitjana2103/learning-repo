import { useState, useEffect } from "react";
import StarRating from "./StarRating";

const tempMovieData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
        imdbID: "tt0133093",
        Title: "The Matrix",
        Year: "1999",
        Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
        imdbID: "tt6751668",
        Title: "Parasite",
        Year: "2019",
        Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
];

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Emoji({ txt, color = false }) {
    return <span className={color ? "emoji-color" : "emoji"}>{txt}</span>;
}

function Logo() {
    return (
        <div className="logo">
            <span role="img">
                <Emoji txt="🍿" />
            </span>
            <h1>POPCON</h1>
        </div>
    );
}

function Search({ query, setQuery }) {
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}

function NumResults({ movies }) {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    );
}

function NavBar({ children }) {
    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    );
}

function Box({ children }) {
    const [isOpen, setIsOpen1] = useState(true);
    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen1((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    );
}

function Movie({ movie, onSelectMovie }) {
    return (
        <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>
                        <Emoji txt="🗓" />
                    </span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}

function MovieList({ movies, onSelectMovie }) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie
                    onSelectMovie={onSelectMovie}
                    movie={movie}
                    key={movie.imdbID}
                />
            ))}
        </ul>
    );
}

function WatchedSummery({ watched }) {
    const avgImdbRating = average(
        Object.values(watched).map((movie) => movie.imdbRating)
    );
    const avgUserRating = average(
        Object.values(watched).map((movie) => movie.userRating)
    );
    const avgRuntime = average(
        Object.values(watched).map((movie) => movie.runtime)
    );

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>
                        <Emoji txt="✌️" color={true} />
                    </span>
                    <span>{watched.length}</span>
                </p>
                <p>
                    <span>
                        <Emoji txt="⭐️" color={true} />
                    </span>
                    <span>{avgImdbRating.toFixed(1)}</span>
                </p>
                <p>
                    <span>
                        <Emoji txt="🌟" color={true} />
                    </span>
                    <span>{avgUserRating.toFixed(1)}</span>
                </p>
                <p>
                    <span>
                        <Emoji txt="⏳" color={true} />
                    </span>
                    <span>{avgRuntime.toFixed(0)} min</span>
                </p>
            </div>
        </div>
    );
}

function WatchedMovie({ movie, onRemoveWatched }) {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>
                        <Emoji txt="⭐️" />
                    </span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>
                        <Emoji txt="🌟" />
                    </span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <Emoji txt="⏳" />
                    <span>{movie.runtime} min</span>
                </p>
                <button
                    className="btn-delete"
                    onClick={() => onRemoveWatched(movie.imdbID)}
                >
                    x
                </button>
            </div>
        </li>
    );
}

function WatchedMovieList({ watched, onRemoveWatched }) {
    console.log(watched);
    return (
        <ul className="list">
            {Object.values(watched).map((movie) => (
                <WatchedMovie
                    movie={movie}
                    key={movie.imdbID}
                    onRemoveWatched={onRemoveWatched}
                />
            ))}
        </ul>
    );
}

function Main({ children }) {
    return <main className="main">{children}</main>;
}

const KEY = "276bfff3";
const API_URL = `http://www.omdbapi.com/?apikey=${KEY}`;

export default function App() {
    const [selectedId, setSelectedId] = useState(null);
    const [query, setQuery] = useState("hero");
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
            async function fetchMovies(searchQuery) {
                try {
                    setIsLoading(true);
                    setError("");
                    const res = await fetch(`${API_URL}&s=${searchQuery}`);

                    if (!res.ok)
                        throw new Error(
                            "Something went wrong with fetching movies"
                        );

                    const data = await res.json();

                    if (data.Response === "False")
                        throw new Error("No movie found !");
                    setMovies(data.Search || []);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            }
            if (query.length < 3) {
                setMovies([]);
                setError("");
                return;
            }
            fetchMovies(query);
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

function Loader() {
    return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
    return (
        <p className="error">
            <span>
                <Emoji txt="🚫" color={true} /> {message}
            </span>
        </p>
    );
}

function MovieDetails({
    selectedId,
    onCloseMovie,
    onAddWatched,
    watched,
    onRemoveWatched,
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const isWatched = watched[selectedId] ? true : false;
    const [userRating, setUserRating] = useState(
        isWatched ? watched[selectedId].userRating : 0
    );

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    function handleAdd() {
        const newMovie = {
            imdbID: selectedId,
            title: title,
            year: year,
            poster: poster,
            imdbRating: Number(imdbRating).toFixed(1),
            runtime: Number(runtime.split(" ").at(0)),
            userRating: Number(userRating).toFixed(1),
        };
        onAddWatched(newMovie);
    }

    function handleRemove() {
        onRemoveWatched(movie.imdbID);
    }

    useEffect(
        function () {
            async function getMovieDetails() {
                setIsLoading(true);
                const res = await fetch(`${API_URL}&i=${selectedId}`);
                const data = await res.json();
                setMovie(data);
                setIsLoading(false);
            }
            getMovieDetails();
        },
        [selectedId]
    );

    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            back
                        </button>
                        <img src={poster} alt={`Poster of ${movie} movie`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>
                                    <Emoji color={true} txt="⭐" />
                                </span>
                                {imdbRating} IMDB rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            <StarRating
                                maxRating={10}
                                size={24}
                                onSetRating={setUserRating}
                                defaultRating={+userRating}
                            />
                            {userRating > 0 && (
                                <button
                                    className="btn-add"
                                    onClick={
                                        isWatched ? handleRemove : handleAdd
                                    }
                                >
                                    {isWatched
                                        ? "x Remove from Watchlist"
                                        : "+ Add to Watchlist"}
                                </button>
                            )}
                        </div>

                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring by {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
        </div>
    );
}
