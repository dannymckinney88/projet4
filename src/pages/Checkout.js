import React, {useState, useEffect, useContext} from 'react';
import { CartContext } from '../context/Cart'
import { PaymentContext } from '../context/Payment'
import { OrderContext } from '../context/Order'
import { commerce } from "../lib/commerce";
import CheckoutForm from "../components/CheckoutForm"

const Checkout = (props) => {
  
    const [cart, setCart] = useContext(CartContext)
    const [paymentInfo, setPaymentInfo] = useContext(PaymentContext)
    const [order, setOrder] = useContext(OrderContext)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    // const [cart, setCart] = useState()
    const [checkoutToken, setCheckoutToken] = useState()

    const cartId = props.match.params.cartId

    const generateCheckoutToken = () => {
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


   

      const handleFormChanges = e =>{
        setPaymentInfo(  {...paymentInfo, [e.target.name] : e.target.value,})
    }

    const refreshCart = () => {
      commerce.cart.refresh().then((newCart) => {
        setCart({ 
          cart: newCart,
        });
      }).catch((error) => {
        console.log('There was an error refreshing your cart', error);
      });
    };

    const handleCaptureCheckout = async (tokenId, newOrder) => {
     
      console.log(newOrder)
      await commerce.checkout.capture(tokenId, newOrder).then((order) => {
        console.log(order)
        console.log("order")
        // Save the order into state
        setOrder({
          order,
        });
        // Clear the cart
        console.log(order)
        refreshCart();
        // setPaymentInfo({})
        // Send the user to the receipt 
        props.history.push('/confirmation');
        // Store the order in session storage so we can show it again if the
        // user refreshes the page!
        window.sessionStorage.setItem('order_receipt', JSON.stringify(order));   
      }).catch((error) => {
        // setErrormsg(error.data.error.message)
        console.log(error);
        // console.log(errormsg)
      });
      console.log(order)
      // this.props.onCaptureCheckout(paymentInfo.checkoutToken.id, orderData);
    };

    const getShippingOptions = (checkoutTokenId, country, region = null) => {

      /* 
      Getting the Customer's Shipping Options based on the Country
      Function is triggered once user selects country in CheckoutForm. 
      */
     
     
    //  if (checkoutToken) {
    //   console.log(checkoutToken.id)
    //       commerce.checkout.getShippingOptions(checkoutToken.id, {
    //           country: "US"
    //       })
    //           .then(res => {
    //               console.log(res)
    //               console.log('======++==========++======++========++')
    //               let shippingOptionsArray = res.map(option => {
    //                   console.log(option)
    //                   let shInfo = {}
  
    //                   shInfo.key = "US"
    //                   shInfo.text = `${option.description}(${option.price.formatted_with_code})`
    //                   shInfo.value = option.id
  
    //                   return shInfo
    //               })
    //               // setShippingOptions(shippingOptionsArray)
    //           })
    //           .catch(err => console.log(err))
    //   }
  }
  // useEffect(() =>{getShippingOptions()})
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
