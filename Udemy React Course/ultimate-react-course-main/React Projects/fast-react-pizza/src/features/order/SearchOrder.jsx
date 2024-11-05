import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
    const [query, setQuery] = useState();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (!query) return;
        navigate(`/order/${query}`);
        setQuery("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm outline-none transition-all duration-300 placeholder:text-stone-400 focus:w-32 sm:w-64 sm:focus:w-72"
                placeholder="Search order #"
                value={query}
                onChange={function (e) {
                    return setQuery(e.target.value);
                }}
            />
        </form>
    );
}

export default SearchOrder;
