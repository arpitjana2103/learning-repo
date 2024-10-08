import { useState } from "react";

const initialItems = [
    {
        id: 1,
        description: "Passport",
        quantity: 2,
        packed: false,
    },
    {
        id: 2,
        description: "Socks",
        quantity: 3,
        packed: true,
    },
    {
        id: 3,
        description: "Charger",
        quantity: 1,
        packed: false,
    },
];

function App() {
    const [items, setItems] = useState(initialItems);

    function handleAddItem(item) {
        return setItems((items) => [...items, item]);
    }

    function handleDeleteItem(id) {
        return setItems(function (items) {
            return items.filter(function (item) {
                return item.id !== id;
            });
        });
    }

    function handleToggleItem(id) {
        return setItems(function (items) {
            return items.map(function (item) {
                return item.id === id
                    ? { ...item, packed: !item.packed }
                    : item;
            });
        });
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItem} />
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onToggleItem={handleToggleItem}
            />
            <Stats items={items} />
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
    return (
        <div className="list">
            <ul>
                {items.map(function (item) {
                    return (
                        <Item
                            item={item}
                            key={item.id}
                            onDeleteItem={onDeleteItem}
                            onToggleItem={onToggleItem}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

function Item({ item, onDeleteItem, onToggleItem }) {
    return (
        <li>
            <input
                type="checkbox"
                checked={item.packed}
                onChange={() => onToggleItem(item.id)}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button>
                <span className="emoji" onClick={() => onDeleteItem(item.id)}>
                    ❌
                </span>
            </button>
        </li>
    );
}

function Stats({ items }) {
    const numItems = items.length;
    const itemsPacked = items.reduce(function (res, item) {
        return item.packed ? res + 1 : res;
    }, 0);
    const itemPackedPercentage = ((itemsPacked / numItems) * 100).toFixed(2);
    return (
        <footer className="stats">
            <em>
                `You have {numItems} items on your list, and you already packed
                {itemsPacked} ({itemPackedPercentage}%)
            </em>
        </footer>
    );
}

export default App;
