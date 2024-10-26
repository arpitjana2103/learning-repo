import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (error) {
                alert("There was an error in loading cities...");
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, []);

    async function getCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch (error) {
            alert("There was an error in getting city...");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setCities(function (cities) {
                return [...cities, data];
            });
        } catch (error) {
            alert("There was an error in creating city..");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            await res.json();
            setCities(function (cities) {
                return cities.filter((city) => city.id !== id);
            });
        } catch (error) {
            alert("There was an error in deleting city..");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities: cities,
                isLoading: isLoading,
                currentCity: currentCity,
                getCity: getCity,
                createCity: createCity,
                deleteCity: deleteCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        return new Error("Cities context was used outside the CitiesProvider");
    return context;
}

export { CitiesProvider, useCities };
