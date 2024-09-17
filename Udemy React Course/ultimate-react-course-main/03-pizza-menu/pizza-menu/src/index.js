import React from "react";
import ReactDOM from "react-dom/client";
import pizzaData from "./data";

const App = function () {
    return (
        <>
            <Header />
            <Menu />
            <Footer />
        </>
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

const Header = function () {
    return <h1>Fast React Pizza Co.</h1>;
};
const Menu = function () {
    return (
        <>
            <h2>Our menu</h2>
            <Pizza />
            <Pizza />
            <Pizza />
        </>
    );
};
const Footer = function () {
    const hour = new Date().getHours();
    const openHour = 12;
    const closeHour = 22;
    const isOpen = hour >= openHour && hour <= closeHour;
    console.log(isOpen);

    return (
        <footer>{new Date().toLocaleDateString()} We'r Currently Open</footer>
    );
};

const rootEl = document.querySelector("#root");
const root = ReactDOM.createRoot(rootEl);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
