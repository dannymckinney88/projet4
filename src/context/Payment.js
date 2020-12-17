import React, { useState, createContext } from "react";

const PaymentContext = createContext();

const PaymentContextProvider = (props) => {
  const [paymentInfo, setPaymentInfo] = useState({
    // Customer details
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@email.com",
    // Shipping details
    shippingName: "Jane Doe",
    shippingStreet: "123 Fake St",
    shippingCity: "San Francisco",
    shippingStateProvince: "CA",
    shippingPostalZipCode: "94107",
    shippingCountry: "US",
    // Payment details
    cardNum: "4242 4242 4242 4242",
    expMonth: "11",
    expYear: "2023",
    ccv: "123",
    billingPostalZipcode: "94107",
    // Shipping and fulfillment data
    shippingCountries: {},
    shippingSubdivisions: {},
    shippingOptions: [],
    shippingOption: "",
  });

  return (
    <PaymentContext.Provider value={[paymentInfo, setPaymentInfo]}>
      {props.children}
    </PaymentContext.Provider>
  );
};

export { PaymentContext, PaymentContextProvider };
