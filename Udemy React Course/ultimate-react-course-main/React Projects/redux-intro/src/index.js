import ReactDOM from "react-dom/client";
import App from "./App";
import "./store";
import "./index.css";

const rootEl = document.querySelector("#root");
const root = ReactDOM.createRoot(rootEl);

root.render(<App />);
