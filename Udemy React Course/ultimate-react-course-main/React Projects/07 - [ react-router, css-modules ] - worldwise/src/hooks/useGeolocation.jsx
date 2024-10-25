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

export function useGeoLocation(defaultPosition = null) {
    const [position, setPosition] = useState(defaultPosition);
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
