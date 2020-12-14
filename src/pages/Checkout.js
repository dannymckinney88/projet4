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
            // }
            // console.log(checkoutToken.id)
    }
    useEffect(() =>{
        generateCheckoutToken()
        // console.log(checkoutToken)
        // fetchShippingCountries(checkoutToken.id)
    },[])
    console.log(checkoutToken)

    //   const renderCheckoutForm = () => {
    //     const { shippingCountries, shippingSubdivisions, shippingOptions } = paymentInfo
    //     return (
    //         <form className="checkout__form" >
    //             <h4 className="checkout__subheading">Customer information</h4>

    //                 <label className="checkout__label" htmlFor="firstName">First name</label>
    //                 <input className="checkout__input" type="text"  value={paymentInfo.firstName} name="firstName" placeholder="Enter your first name" required />

    //                 <label className="checkout__label" htmlFor="lastName">Last name</label>
    //                 <input className="checkout__input" type="text"  value={paymentInfo.lastName}name="lastName" placeholder="Enter your last name" required />

    //                 <label className="checkout__label" htmlFor="email">Email</label>
    //                 <input className="checkout__input" type="text"  value={paymentInfo.email} name="email" placeholder="Enter your email" required />

    //             <h4 className="checkout__subheading">Shipping details</h4>

    //             <label className="checkout__label" htmlFor="shippingName">Full name</label>
    //             <input className="checkout__input" type="text"  value={paymentInfo.shippingName} name="shippingName" placeholder="Enter your shipping full name" required />

    //             <label className="checkout__label" htmlFor="shippingStreet">Street address</label>
    //             <input className="checkout__input" type="text"  value={paymentInfo.shippingStreet} name="shippingStreet" placeholder="Enter your street address" required />

    //             <label className="checkout__label" htmlFor="shippingCity">City</label>
    //             <input className="checkout__input" type="text"  value={paymentInfo.shippingCity} name="shippingCity" placeholder="Enter your city" required />

    //             <label className="checkout__label" htmlFor="shippingPostalZipCode">Postal/Zip code</label>
    //             <input className="checkout__input" type="text"  value={paymentInfo.shippingPostalZipCode} name="shippingPostalZipCode" placeholder="Enter your postal/zip code" required />

    //             <label className="checkout__label" htmlFor="shippingCountry">Country</label>
    //             <select
    //                 value={paymentInfo.shippingCountry}
    //                 name="shippingCountry"
    //                 className="checkout__select"
    //             >
    //                 <option disabled>Country</option>
    //                 {
    //                     Object.keys(shippingCountries).map((index) => {
    //                         return (
    //                             <option value={index} key={index}>{shippingCountries[index]}</option>
    //                         );
    //                     })
    //                 };
    //             </select>

    //             <label className="checkout__label" htmlFor="shippingStateProvince">State/province</label>
    //             <select
    //                 value={paymentInfo.shippingStateProvince}
    //                 name="shippingStateProvince"
    //                 className="checkout__select"
    //             >
    //                 <option className="checkout__option" disabled>State province</option>
    //                 {
    //                     Object.keys(shippingSubdivisions).map((index) => {
    //                         return (
    //                             <option value={index} key={index}>{shippingSubdivisions[index]}</option>
    //                         );
    //                     })
    //                 };

    //             </select>

    //             <label className="checkout__label" htmlFor="shippingOption">Shipping method</label>
    //             <select
    //                 value={paymentInfo.shippingOption.id}
    //                 name="shippingOption"
                    
    //                 className="checkout__select"
    //             >
    //                 <option className="checkout__select-option" disabled>Select a shipping method</option>
    //                 {
    //                     shippingOptions.map((method, index) => {
    //                         return (
    //                             <option className="checkout__select-option" value={method.id} key={index}>{`${method.description} - $${method.price.formatted_with_code}` }</option>
    //                         );
    //                     })
    //                 };
    //             </select>

    //             <h4 className="checkout__subheading">Payment information</h4>

    //             <label className="checkout__label" htmlFor="cardNum">Credit card number</label>
    //             <input className="checkout__input" type="text" name="cardNum"  value={paymentInfo.cardNum} placeholder="Enter your card number" />

    //             <label className="checkout__label" htmlFor="expMonth">Expiry month</label>
    //             <input className="checkout__input" type="text" name="expMonth"  value={paymentInfo.expMonth} placeholder="Card expiry month" />

    //             <label className="checkout__label" htmlFor="expYear">Expiry year</label>
    //             <input className="checkout__input" type="text" name="expYear"  value={paymentInfo.expYear} placeholder="Card expiry year" />

    //             <label className="checkout__label" htmlFor="ccv">CCV</label>
    //             <input className="checkout__input" type="text" name="ccv"  value={paymentInfo.ccv} placeholder="CCV (3 digits)" />

    //             <button  className="checkout__btn-confirm">Confirm order</button>
    //         </form>
    //     );
    // };
      
 
      // useEffect( () =>{fetchShippingCountries(checkoutToken.id)})
      
      // useEffect((preProps, prevState) =>{
      //   if (this.state.form.shipping.country !== prevState.form.shipping.country) {
      //     this.fetchShippingOptions(this.state.checkoutToken.id, this.state.shippingCountry);
      //   }
      // })
      //  console.log(checkoutToken.id)



    return (
        <div>
            <CheckoutForm
              checkoutToken={checkoutToken}
              paymentInfo={paymentInfo}
              cart={cart}
            />
        </div>
    );
}

export default Checkout;
