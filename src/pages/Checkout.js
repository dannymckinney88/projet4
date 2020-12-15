import React, {useState, useEffect, useContext} from 'react';
import { CartContext } from '../context/Cart'
import { PaymentContext } from '../context/Payment'

import { commerce } from "../lib/commerce";
import CheckoutForm from "../components/CheckoutForm"

const Checkout = (props) => {
  
    const [cart] = useContext(CartContext)
    const [paymentInfo, setPaymentInfo] = useContext(PaymentContext)


    // const [cart, setCart] = useState()
    const [checkoutToken, setCheckoutToken] = useState()

    const cartId = props.match.params.cartId

    const generateCheckoutToken = () => {
          console.log(cartId)
          // if (props.cart.cart.line_items.length) {
            commerce.checkout.generateToken(cartId, { type: 'cart' })
            .then((token) => {
              console.log(token)
              setCheckoutToken(token);})
              // .then(() =>fetchShippingCountries(checkoutToken.id))
              .catch((error) => {
                console.log('There was an error in generating a token', error);
              });
    }
    useEffect(() =>{
        generateCheckoutToken()
    },[])
    console.log(checkoutToken)

   

      const handleFormChanges = e =>{
        setPaymentInfo(  {...paymentInfo, [e.target.name] : e.target.value,})
    }

    const handleCaptureCheckout = (e) => {
      e.preventDefault();
      const orderData = {
        // line_items: paymentInfo.checkoutToken.live.line_items,
        customer: {
          firstname: paymentInfo.firstName,
          lastname: paymentInfo.lastName,
          email: paymentInfo.email,
        },
        shipping: {
          name: paymentInfo.shippingName,
          street: paymentInfo.shippingStreet,
          town_city: paymentInfo.shippingCity,
          county_state: paymentInfo.shippingStateProvince,
          postal_zip_code: paymentInfo.shippingPostalZipCode,
          country: paymentInfo.shippingCountry,
        },
        fulfillment: {
          shipping_method: paymentInfo.shippingOption.id
        },
        payment: {
          gateway: "test_gateway",
          card: {
            number: paymentInfo.cardNum,
            expiry_month: paymentInfo.expMonth,
            expiry_year: paymentInfo.expYear,
            cvc: paymentInfo.ccv,
            postal_zip_code: paymentInfo.billingPostalZipcode,
          },
        },
      };
      console.log(orderData)
      // this.props.onCaptureCheckout(paymentInfo.checkoutToken.id, orderData);
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
}

export default Checkout;
