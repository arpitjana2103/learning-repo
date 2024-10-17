import Emoji from "./Emoji";
export default function WatchedMovie({ movie, onRemoveWatched }) {
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
