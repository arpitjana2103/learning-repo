import Message from "./Message";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
    const { cities, isLoading } = useCities();
    if (isLoading) {
        return <Spinner />;
    }

    if (!cities.length)
        return (
            <Message message="Add you first city by clicking on a city on the map" />
        );

    // [{emoji, country}]
    const countries = Object.values(
        cities.reduce(function (acc, city) {
            return {
                ...acc,
                [city.country]: {
                    country: city.country,
                    emoji: city.emoji,
                    id: city.id,
                },
            };
        }, {})
    );

    return (
        <ul className={styles.countryList}>
            {countries.map(function (country) {
                return <CountryItem country={country} key={country.id} />;
            })}
        </ul>
    );
}

export default CountryList;
