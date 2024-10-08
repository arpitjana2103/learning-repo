import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

    function handleClearlist() {
        const confirm = window.confirm(
            "Are you sure you want to delete all items ?"
        );
        return setItems(function (items) {
            return confirm ? [] : items;
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
                onClearList={handleClearlist}
            />
            <Stats items={items} />
        </div>
    );
}

export default App;
