import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import { CartContextProvider } from "./context/Cart"


ReactDOM.render(
  <React.StrictMode>
       <CartContextProvider>

    <Router>
      <App />
    </Router>
    </CartContextProvider>

  </React.StrictMode>,
  document.getElementById("root")
);
