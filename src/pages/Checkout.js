import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/Cart";
import { PaymentContext } from "../context/Payment";
import { OrderContext } from "../context/Order";
import { commerce } from "../lib/commerce";
import CheckoutForm from "../components/CheckoutForm";

const Checkout = (props) => {
  const [cart, setCart] = useContext(CartContext);
  const [paymentInfo, setPaymentInfo] = useContext(PaymentContext);
  const [order, setOrder] = useContext(OrderContext);

  const [checkoutToken, setCheckoutToken] = useState();

  const cartId = props.match.params.cartId;

  const generateCheckoutToken = () => {
    commerce.checkout
      .generateToken(cartId, { type: "cart" })
      .then((token) => {
        console.log(token);
        setCheckoutToken(token);
      })

      .catch((error) => {
        console.log("There was an error in generating a token", error);
      });
  };
  useEffect(() => {
    generateCheckoutToken();
  }, []);

  const handleFormChanges = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const refreshCart = () => {
    commerce.cart
      .refresh()
      .then((newCart) => {
        setCart({
          cart: newCart,
        });
      })
      .catch((error) => {
        console.log("There was an error refreshing your cart", error);
      });
  };

  const handleCaptureCheckout = async (tokenId, newOrder) => {
    console.log(newOrder);
    await commerce.checkout
      .capture(tokenId, newOrder)
      .then((order) => {
        console.log(order);
        console.log("order");
        // Save the order into state
        setOrder({
          order,
        });
        // Clear the cart
        console.log(order);
        refreshCart();
        // Send the user to the receipt
        props.history.push("/confirmation");
        // Store the order in session storage so we can show it again if the
        // user refreshes the page!
        window.sessionStorage.setItem("order_receipt", JSON.stringify(order));
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(order);
  };

  return (
    <div>
      <CheckoutForm
        checkoutToken={checkoutToken}
        paymentInfo={paymentInfo}
        handleFormChanges={handleFormChanges}
        handleCaptureCheckout={handleCaptureCheckout}
        cart={cart}
      />
    </div>
  );
};

export default Checkout;
