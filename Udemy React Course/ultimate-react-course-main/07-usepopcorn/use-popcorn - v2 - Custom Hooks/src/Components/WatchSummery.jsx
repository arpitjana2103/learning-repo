import Emoji from "./Emoji";

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function WatchedSummery({ watched }) {
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
                    <span>{Object.keys(watched).length}</span>
                </p>
                <p>
                    <span>
                        <Emoji txt="🍅" color={true} />
                    </span>
                    <span>{avgImdbRating.toFixed(1)}</span>
                </p>
                <p>
                    <span>
                        <Emoji txt="⭐️" color={true} />
                    </span>
                    <span>{avgUserRating.toFixed(1)}</span>
                </p>
                <p>
                    <span>
                        <Emoji txt="🕗" color={true} />
                    </span>
                    <span>{avgRuntime.toFixed(0)} min</span>
                </p>
            </div>
        </div>
    );
}
