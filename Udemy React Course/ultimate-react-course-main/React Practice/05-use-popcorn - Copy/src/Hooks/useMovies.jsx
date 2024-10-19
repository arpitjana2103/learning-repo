import { useState, useEffect } from "react";

const KEY = "276bfff3";
export const API_URL = `http://www.omdbapi.com/?apikey=${KEY}`;

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
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

            // handleCloseMovie();
            fetchMovies(query);

            return function () {
                controller.abort();
            };
        },
        [query]
    );

    return { movies, isLoading, error };
}
