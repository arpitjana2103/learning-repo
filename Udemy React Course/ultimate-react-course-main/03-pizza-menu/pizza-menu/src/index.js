import React from "react";
import ReactDOM from "react-dom/client";
import pizzaData from "./data";

const App = function () {
    return (
        <div>
            <h1>Hello Arpit !</h1>
            <Pizza />
        </div>
    );
};

const Pizza = function () {
    return (
        <div>
            <img src="pizzas/spinaci.jpg" alt="Pizza spinaci" />
            <h2>Pizza Spinaci</h2>
            <p>Tomato, mozarella, spinach and ricotta cheese</p>
        </div>
    );
};

const rootEl = document.querySelector("#root");
const root = ReactDOM.createRoot(rootEl);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
