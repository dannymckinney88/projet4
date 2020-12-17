import React, { useState, createContext } from "react";

const OrderContext = createContext();

const OrderContextProvider = (props) => {
  const [orderContext, setOrderContext] = useState();

  return (
    <OrderContext.Provider value={[orderContext, setOrderContext]}>
      {props.children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderContextProvider };
