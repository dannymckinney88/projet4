import React, { useState, useEffect, createContext } from "react";
import { commerce } from "../lib/commerce";

const CartContext = createContext();

const CartContextProvider = (props) => {
  const [cart, setCart] = useState();

  const fetchCart = async () => {
    await commerce.cart
      .retrieve()
      .then((cart) => {
        setCart({ cart });
      })
      .catch((error) => {
        console.error("There was an error fetching the cart", error);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);
  console.log(props.children);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
