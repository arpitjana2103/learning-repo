import { useState } from "react";

function SlowComponent() {
    // If this is too slow on your maching, reduce the `length`
    const words = Array.from({ length: 100_000 }, () => "WORD");
    return (
        <ul>
            {words.map((word, i) => (
                <li key={i}>
                    {i}: {word}
                </li>
            ))}
        </ul>
    );
}

function Counter({ children }) {
    const [count, setCount] = useState(0);
    return (
        <div style={{ marginTop: "2rem" }}>
            <button onClick={() => setCount((c) => c + 1)}>
                (slow counter) Increase : {count}
            </button>
            {children}
        </div>
    );
}

export default function Test() {
    return (
        <Counter>
            <SlowComponent />
        </Counter>
    );
}
