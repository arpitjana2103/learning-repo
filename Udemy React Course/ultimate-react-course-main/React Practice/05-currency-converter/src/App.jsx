// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";
const URL = "https://api.frankfurter.app/latest";
export default function App() {
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("USD");
    const [amount, setAmount] = useState(0);
    const [resAmount, setResAmount] = useState(0);

    useEffect(
        function () {
            async function fetchAmount() {
                const resp = await fetch(
                    `${URL}?amount=${amount}&from=${from}&to=${to}`
                );
                const data = await resp.json();
                setResAmount(data.rates[to]);
            }
            if (amount !== 0 && from !== to) fetchAmount();
            else setResAmount(amount);
        },
        [from, to, amount]
    );

    return (
        <div>
            <input
                type="number"
                value={amount ? amount : ""}
                onChange={(e) => setAmount(Number(e.target.value))}
            />
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <p>
                Result : {resAmount} {to}
            </p>
        </div>
    );
}
