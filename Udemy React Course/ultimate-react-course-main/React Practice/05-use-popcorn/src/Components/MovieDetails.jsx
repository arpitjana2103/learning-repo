import { useEffect, useState } from "react";
import { API_URL } from "../App";
import StarRating from "./StarRating";
import Loader from "./Loader";
import Emoji from "./Emoji";

export default function MovieDetails({
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
        watched[selectedId]?.userRating || 0
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
            userRating: userRating,
        };
        onAddWatched(newMovie);
    }

    function handleRemove() {
        onRemoveWatched(movie.imdbID);
    }

    useEffect(
        function () {
            function handleKeyPress(e) {
                if (e.code === "Escape") {
                    onCloseMovie();
                    console.log("Closing Movie");
                }
            }
            document.addEventListener("keydown", handleKeyPress);

            return function () {
                document.removeEventListener("keydown", handleKeyPress);
            };
        },
        [onCloseMovie]
    );

    useEffect(
        function () {
            if (!title) return;
            document.title = `Movie | ${title}`;

            return function () {
                document.title = "POPCON";
            };
        },
        [title]
    );

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
                                        ? "Remove from Watchlist"
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
