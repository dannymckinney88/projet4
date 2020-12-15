import React, { useState, useEffect, createContext } from "react";

const OrderContext = createContext();

const OrderContextProvider = (props) => {
 
    const [orderContext, setOrderContext] = useState()

  
  return (
    <OrderContext.Provider value={[OrderContext, setOrderContext]}>
      {props.children}
    </OrderContext.Provider>
  );
};

export { OrderContext ,OrderContextProvider };