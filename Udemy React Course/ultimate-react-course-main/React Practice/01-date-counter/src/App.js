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
  if (count == 0) return "Today is : ";
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

  function handleStepInc() {
    return setStep((s) => s + 1);
  }

  function handleStepDec() {
    return setStep((s) => s - 1);
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
        <button onClick={handleStepDec}>-</button>
        <span> Step : {step} </span>
        <button onClick={handleStepInc}>+</button>
      </div>

      <div>
        <button onClick={handleCountDec}>-</button>
        <span> Count : {count} </span>
        <button onClick={handleCountInc}>+</button>
      </div>

      <span>
        {getMessage(count)}
        {getDate(count)}
      </span>
    </div>
  );
}
