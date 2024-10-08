import { useState } from "react";

const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
    { id: 3, description: "Charger", quantity: 12, packed: true },
];

function App() {
    return (
        <div className="app">
            <Logo />
            <Form />
            <PackingList />
            <Stats />
        </div>
    );
}

function Logo() {
    return (
        <h1>
            <span className="emoji">🌴</span>
            <span>&nbsp;Far Away&nbsp;</span>
            <span className="emoji">🧳</span>
        </h1>
    );
}

function Form() {
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

        initialItems.push(newItem);

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

function PackingList() {
    return (
        <div className="list">
            <ul>
                {initialItems.map(function (item) {
                    return <Item item={item} key={item.id} />;
                })}
            </ul>
        </div>
    );
}

function Item({ item }) {
    return (
        <li>
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button>
                <span className="emoji">❌</span>
            </button>
        </li>
    );
}

function Stats() {
    return (
        <footer className="stats">
            <em>
                You have X items on your list, and you already packed X (X%)
            </em>
        </footer>
    );
}

export default App;
