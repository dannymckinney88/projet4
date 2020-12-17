import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import { CartContextProvider } from "./context/Cart";
import { PaymentContextProvider } from "./context/Payment";
import { OrderContextProvider } from "./context/Order";

ReactDOM.render(
  <React.StrictMode>
    <CartContextProvider>
      <PaymentContextProvider>
        <OrderContextProvider>
          <Router>
            <App />
          </Router>
        </OrderContextProvider>
      </PaymentContextProvider>
    </CartContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
