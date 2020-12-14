import React, {useState, useEffect, useContext} from 'react';
import { CartContext } from '../context/Cart'

import { commerce } from "../lib/commerce";

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

    // const fetchCart = () =>{
    //     commerce.cart.retrieve().then((cart) => {
    //     //   console.log(cart)
    //       setCart({ cart });
    //     }).catch((error) => {
    //       console.error('There was an error fetching the cart', error);
    //     });
    //   }

    const generateCheckoutToken = () => {
        // console.log(cart.cart.line_items.length)
        if(cart){

          if (cart.cart.line_items.length) {
            commerce.checkout.generateToken(cart.cart.id, { type: 'cart' })
              .then((token) => {
                  console.log(token)
                setCheckoutToken(token);
            }).catch((error) => {
              console.log('There was an error in generating a token', error);
            });
          }
        }
      }

      const renderCheckoutForm = () => {
        const { shippingCountries, shippingSubdivisions, shippingOptions } = this.state;

        return (
            <form className="checkout__form" onChange={this.handleFormChanges}>
                <h4 className="checkout__subheading">Customer information</h4>

                    <label className="checkout__label" htmlFor="firstName">First name</label>
                    <input className="checkout__input" type="text" onChange={this.handleFormChanges} value={paymentInfo.firstName} name="firstName" placeholder="Enter your first name" required />

                    <label className="checkout__label" htmlFor="lastName">Last name</label>
                    <input className="checkout__input" type="text" onChange={this.handleFormChanges} value={paymentInfo.lastName}name="lastName" placeholder="Enter your last name" required />

                    <label className="checkout__label" htmlFor="email">Email</label>
                    <input className="checkout__input" type="text" onChange={this.handleFormChanges} value={paymentInfo.email} name="email" placeholder="Enter your email" required />

                <h4 className="checkout__subheading">Shipping details</h4>

                <label className="checkout__label" htmlFor="shippingName">Full name</label>
                <input className="checkout__input" type="text" onChange={this.handleFormChanges} value={paymentInfo.shippingName} name="shippingName" placeholder="Enter your shipping full name" required />

                <label className="checkout__label" htmlFor="shippingStreet">Street address</label>
                <input className="checkout__input" type="text" onChange={this.handleFormChanges} value={paymentInfo.shippingStreet} name="shippingStreet" placeholder="Enter your street address" required />

                <label className="checkout__label" htmlFor="shippingCity">City</label>
                <input className="checkout__input" type="text" onChange={this.handleFormChanges} value={paymentInfo.shippingCity} name="shippingCity" placeholder="Enter your city" required />

                <label className="checkout__label" htmlFor="shippingPostalZipCode">Postal/Zip code</label>
                <input className="checkout__input" type="text" onChange={this.handleFormChanges} value={paymentInfo.shippingPostalZipCode} name="shippingPostalZipCode" placeholder="Enter your postal/zip code" required />

                <label className="checkout__label" htmlFor="shippingCountry">Country</label>
                <select
                    value={paymentInfo.shippingCountry}
                    name="shippingCountry"
                    onChange={this.handleShippingCountryChange}
                    className="checkout__select"
                >
                    <option disabled>Country</option>
                    {
                        Object.keys(shippingCountries).map((index) => {
                            return (
                                <option value={index} key={index}>{shippingCountries[index]}</option>
                            );
                        })
                    };
                </select>

                <label className="checkout__label" htmlFor="shippingStateProvince">State/province</label>
                <select
                    value={paymentInfo.shippingStateProvince}
                    name="shippingStateProvince"
                    onChange={this.handleSubdivisionChange}
                    className="checkout__select"
                >
                    <option className="checkout__option" disabled>State/province</option>
                    {
                        Object.keys(shippingSubdivisions).map((index) => {
                            return (
                                <option value={index} key={index}>{shippingSubdivisions[index]}</option>
                            );
                        })
                    };

                </select>

                <label className="checkout__label" htmlFor="shippingOption">Shipping method</label>
                <select
                    value={paymentInfo.shippingOption.id}
                    name="shippingOption"
                    onChange={this.handleFormChanges}
                    className="checkout__select"
                >
                    <option className="checkout__select-option" disabled>Select a shipping method</option>
                    {
                        shippingOptions.map((method, index) => {
                            return (
                                <option className="checkout__select-option" value={method.id} key={index}>{`${method.description} - $${method.price.formatted_with_code}` }</option>
                            );
                        })
                    };
                </select>

                <h4 className="checkout__subheading">Payment information</h4>

                <label className="checkout__label" htmlFor="cardNum">Credit card number</label>
                <input className="checkout__input" type="text" name="cardNum" onChange={this.handleFormChanges} value={paymentInfo.cardNum} placeholder="Enter your card number" />

                <label className="checkout__label" htmlFor="expMonth">Expiry month</label>
                <input className="checkout__input" type="text" name="expMonth" onChange={this.handleFormChanges} value={paymentInfo.expMonth} placeholder="Card expiry month" />

                <label className="checkout__label" htmlFor="expYear">Expiry year</label>
                <input className="checkout__input" type="text" name="expYear" onChange={this.handleFormChanges} value={paymentInfo.expYear} placeholder="Card expiry year" />

                <label className="checkout__label" htmlFor="ccv">CCV</label>
                <input className="checkout__input" type="text" name="ccv" onChange={this.handleFormChanges} value={paymentInfo.ccv} placeholder="CCV (3 digits)" />

                <button onClick={this.handleCaptureCheckout} className="checkout__btn-confirm">Confirm order</button>
            </form>
        );
    };
      
      useEffect(() =>{
          generateCheckoutToken()
      },[])
      
      useEffect(() =>{
        if (this.state.form.shipping.country !== prevState.form.shipping.country) {
          this.fetchShippingOptions(this.state.checkoutToken.id, this.state.shippingCountry);
        }
      })
       console.log(checkoutToken, cart)

    //   console.log(props)

    return (
        <div>
            Checkout
        </div>
    );
}

export default Checkout;
