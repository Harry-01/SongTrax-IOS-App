import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";

/**
 * Render the root React component into the DOM.
 *
 * This function initializes the React root and renders the top-level "App" component
 * wrapped in a "React.StrictMode" component into the DOM element with the ID "root."
 *
 * @param {HTMLElement} rootElement - The root DOM element where the app will be rendered.
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
