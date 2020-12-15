import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import { CartContextProvider } from "./context/Cart";
import { PaymentContextProvider } from "./context/Payment";

ReactDOM.render(
  <React.StrictMode>
    <CartContextProvider>
      <PaymentContextProvider>
        <Router>
          <App />
        </Router>
      </PaymentContextProvider>
    </CartContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
