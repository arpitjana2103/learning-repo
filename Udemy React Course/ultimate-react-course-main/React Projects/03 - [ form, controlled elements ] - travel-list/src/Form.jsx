import { useState } from "react";

function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [itemCount, setItemCount] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();
        if (!description) return;
        const newItem = {
            description,
            quantity: itemCount,
            packed: false,
            id: Date.now(),
        };

        onAddItems(newItem);

        setItemCount(1);
        setDescription("");
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>
                What do you need for your <span className="emoji">😍</span> trip
                ?
            </h3>
            <select
                value={itemCount}
                onChange={(e) => setItemCount(Number(e.target.value))}
            >
                {new Array(20)
                    .fill(1)
                    .map((ele, i) => ele + i)
                    .map(function (num) {
                        return (
                            <option value={num} key={num}>
                                {num}
                            </option>
                        );
                    })}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button>Add</button>
        </form>
    );
}

export default Form;
