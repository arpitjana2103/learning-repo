import { useState } from "react";

function getCurrentPosition() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            function (error) {
                reject(error);
            }
        );
    });
}

function useGeoLocate() {
    const [position, setPosition] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function getGeoLocation() {
        try {
            setIsLoading(true);
            setError("");
            setPosition(await getCurrentPosition());
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return { position, isLoading, error, getGeoLocation };
}

export default function App() {
    const [count, setCount] = useState(0);
    const {
        position: { lat, lng },
        isLoading,
        error,
        getGeoLocation,
    } = useGeoLocate();

    async function handleClick() {
        await getGeoLocation();
        setCount((curr) => curr + 1);
    }

    return (
        <>
            <button onClick={handleClick}>Get my position</button>
            {!error && !isLoading && lat && lng && (
                <p>
                    Your current position is&nbsp;&nbsp;
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
                    >
                        {lat}, {lng}
                    </a>
                </p>
            )}

            {isLoading && <p>loading...</p>}
            {error && <p>{error}</p>}
            {<p>You requested location : {count} times</p>}
        </>
    );
}
