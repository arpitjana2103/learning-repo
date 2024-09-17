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

const Pizza = function ({ pizzaObj }) {
    return (
        <div className="pizza">
            <img src={pizzaObj.photoName} alt={pizzaObj.name} />
            <div>
                <h3>{pizzaObj.name}</h3>
                <p>{pizzaObj.ingredients}</p>
                <span>{pizzaObj.price}</span>
            </div>
        </div>
    );
};

const Menu = function () {
    let pizzas = pizzaData;
    const numPizzas = pizzas.length;

    return (
        <main className="menu">
            <h2>Our menu</h2>

            {numPizzas > 0 ? (
                <>
                    <p>
                        Authentic Italian cuisine. 6 creative dishes to choose
                        from. All from our stone oven, all organic, all
                        delicious.
                    </p>
                    <ul className="pizzas">
                        {pizzaData.map(function (pizza, index) {
                            return <Pizza pizzaObj={pizza} key={index} />;
                        })}
                    </ul>
                </>
            ) : (
                <p>
                    We're still working on our menu. Please come back later :)
                </p>
            )}
        </main>
    );
};

const Order = function ({ closeHour }) {
    return (
        <div className="order">
            <p>We'r open until {closeHour}:00. Come visit us or order online</p>
            <button className="btn">Order</button>
        </div>
    );
};

const Footer = function () {
    const hour = new Date().getHours();
    const openHour = 9;
    const closeHour = 20;
    const isOpen = hour >= openHour && hour <= closeHour;

    return (
        <footer className="footer">
            {isOpen ? (
                <Order closeHour={closeHour} />
            ) : (
                <p>
                    We're happy to welcome you between {openHour}:00 and{" "}
                    {closeHour}:00.
                </p>
            )}
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
