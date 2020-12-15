import React, {useState, useEffect, useContext} from 'react';
import { CartContext } from '../context/Cart'

import { commerce } from "../lib/commerce";
import CheckoutForm from "../components/CheckoutForm"

const Checkout = (props) => {
  
    const [cart] = useContext(CartContext)

    // const [cart, setCart] = useState()
    const [checkoutToken, setCheckoutToken] = useState()

    const [paymentInfo, setPaymentInfo] = useState({
      // Customer details
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'janedoe@email.com',
      // Shipping details
      shippingName: 'Jane Doe',
      shippingStreet: '123 Fake St',
      shippingCity: 'San Francisco',
      shippingStateProvince: 'CA',
      shippingPostalZipCode: '94107',
      shippingCountry: 'US',
      // Payment details
      cardNum: '4242 4242 4242 4242',
      expMonth: '11',
      expYear: '2023',
      ccv: '123',
      billingPostalZipcode: '94107',
      // Shipping and fulfillment data
      shippingCountries: {},
      shippingSubdivisions: {},
      shippingOptions: [],
      shippingOption: '',
    })
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


    return (
        <div>
            <CheckoutForm
              checkoutToken={checkoutToken}
              paymentInfo={paymentInfo}
              handleFormChanges={handleFormChanges}
              cart={cart}
            />
        </div>
    );
}

export default Checkout;
