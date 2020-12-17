import React, { useState, useContext } from "react";
import { CartContext } from "./context/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routes from "./config/routes";

const App = () => {
  const [cart] = useContext(CartContext);
  const [checkoutToken] = useState();

  return (
    <div>
      <Header cart={cart} />
      <Routes checkout={checkoutToken} />
      <Footer/>
    </div>
  );
};

export default App;
