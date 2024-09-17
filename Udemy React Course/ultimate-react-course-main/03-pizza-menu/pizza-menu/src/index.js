import React from "react";
import ReactDOM from "react-dom/client";
import pizzaData from "./data";
import "./index.css";

const App = function () {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>
    );
};

const Header = function () {
    return (
        <header className="header">
            <h1>Fast React Pizza Co.</h1>
        </header>
    );
};

const Pizza = function (props) {
    console.log(props);
    return (
        <div className="pizza">
            <img src={props.photoName} alt={props.name} />
            <div>
                <h3>{props.name}</h3>
                <p>{props.ingredients}</p>
                <span>{props.price}</span>
            </div>
        </div>
    );
};

const Menu = function () {
    return (
        <main className="menu">
            <h2>Our menu</h2>
            <Pizza
                name="Pizza Spinaci"
                ingredients="Tomato, mozarella, spinach and ricotta cheese"
                photoName="pizzas/spinaci.jpg"
                price={10}
            />

            <Pizza
                name="Pizza Funghi"
                ingredients="Tomato, mozarella, spinach and ricotta cheese"
                photoName="pizzas/funghi.jpg"
                price={12}
            />
        </main>
    );
};

const Footer = function () {
    const hour = new Date().getHours();
    const openHour = 12;
    const closeHour = 22;
    const isOpen = hour >= openHour && hour <= closeHour;

    return (
        <footer className="footer">
            {new Date().toLocaleDateString()} We'r Currently Open
        </footer>
    );
};

const rootEl = document.querySelector("#root");
const root = ReactDOM.createRoot(rootEl);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
