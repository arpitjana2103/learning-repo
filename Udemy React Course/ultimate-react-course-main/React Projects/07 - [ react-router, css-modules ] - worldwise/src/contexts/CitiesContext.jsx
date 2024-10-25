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
                alert("There was an error loading data..");
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
            // console.log(data);
            setCurrentCity(data);
        } catch (error) {
            alert("There was an error loading data..");
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
