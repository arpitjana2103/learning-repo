import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import "./index.css";

const rootEl = document.querySelector("#root");
const root = ReactDOM.createRoot(rootEl);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
