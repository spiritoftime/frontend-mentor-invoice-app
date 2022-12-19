import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux-store/index";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { extendTheme } from "@chakra-ui/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// 1. Import the utilities

// 2. Update the breakpoints as key-value pairs
const breakpoints = {
  sm: "375px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1440px",
};

// 3. Extend the theme
const theme = extendTheme({ breakpoints });
