import { useState } from "react";

function App() {
    const [bill, setBill] = useState("");
    const [serviceRating01, setServiceRating01] = useState(0);
    const [serviceRating02, setServiceRating02] = useState(0);
    const avgRating = Math.floor((serviceRating01 + serviceRating02) / 2);
    const tip = (bill * avgRating) / 100;
    const totalBill = bill + tip;

    function handleReset() {
        setBill(0);
        setServiceRating01(0);
        setServiceRating02(0);
    }

    return (
        <>
            <BillInput bill={bill} setBill={setBill} />
            <SelectPersentage
                serviceRating={serviceRating01}
                setServiceRating={setServiceRating01}
            >
                How do you like the service ?
            </SelectPersentage>
            <SelectPersentage
                serviceRating={serviceRating02}
                setServiceRating={setServiceRating02}
            >
                How do your friend like the service ?
            </SelectPersentage>
            <BillOutput bill={bill} tip={tip} totalBill={totalBill} />
            <Reset onReset={handleReset} />
        </>
    );
}

function Reset({ onReset }) {
    return <button onClick={onReset}>Reset</button>;
}

function BillInput({ bill, setBill }) {
    return (
        <div>
            <span>How much was the bill ?</span>
            <input
                type="text"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
            />
        </div>
    );
}

function BillOutput({ bill, tip, totalBill }) {
    return (
        <h2>
            You pay ${totalBill} (${bill ? bill : 0} + ${tip})
        </h2>
    );
}

function SelectPersentage({ children, serviceRating, setServiceRating }) {
    function handleOnChange(e) {
        return setServiceRating(Number(e.target.value));
    }
    return (
        <div>
            <span>{children}</span>
            <select value={serviceRating} onChange={handleOnChange}>
                <option value="0">Dissatisfied ( 0 % )</option>
                <option value="5">It was okay ( 5 % )</option>
                <option value="10">It was good ( 10 % )</option>
                <option value="20">Absolutely amazing! ( 20 % )</option>
            </select>
        </div>
    );
}

export default App;
