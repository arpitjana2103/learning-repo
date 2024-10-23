import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({ watched, onRemoveWatched }) {
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
