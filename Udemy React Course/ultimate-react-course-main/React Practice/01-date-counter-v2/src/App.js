import { useState } from "react";

export default function App() {
  return <DateCounter />;
}

function getDate(count) {
  const today = new Date();
  today.setDate(today.getDate() + count);
  return today.toDateString();
}

function getMessage(count) {
  if (count === 0) return "Today is : ";
  if (count > 0) return `${count} days from today is : `;
  if (count < 0) return `${-count} days ago was : `;
}

function DateCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  function handleCountInc() {
    return setCount((c) => c + step);
  }

  function handleCountDec() {
    return setCount((c) => c - step);
  }

  function handleOnChangeSteps(e) {
    return setStep((_) => setStep(Number(e.target.value)));
  }

  function handleOnChangeCount(e) {
    return setCount((_) => setCount(Number(e.target.value)));
  }

  function handleReset() {
    setCount(0);
    setStep(1);
  }

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  };
  return (
    <div style={style}>
      <div>
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={handleOnChangeSteps}
        />
        {step}
      </div>
      <div>
        <button onClick={handleCountDec}>-</button>
        <input type="text" value={count} onChange={handleOnChangeCount} />
        <button onClick={handleCountInc}>+</button>
      </div>
      <span>
        {getMessage(count)}
        {getDate(count)}
      </span>

      <button onClick={handleReset}>RESET</button>
    </div>
  );
}
