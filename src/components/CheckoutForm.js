import React, {useState, useEffect, useContext} from 'react';
import { CartContext } from '../context/Cart'

import { commerce } from "../lib/commerce";
const CheckoutForm = (props) => {
    // const [subdivision, setSubdivision] = useState()
 
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
    
      console.log(props)
    const  fetchSubdivisions =() =>{
            commerce.services.localeListSubdivisions("US").then((subdivisions) => {
                console.log(subdivisions)
                setPaymentInfo({
                    
                  "shippingSubdivisions": subdivisions.subdivisions,
                })
            }).catch((error) => {
                console.log('There was an error fetching the subdivisions', error);
            });
        
    }

      if(props.checkoutToken){

          console.log(props.checkoutToken.id)
      }

      useEffect(() =>{
          fetchSubdivisions()
    },[])

    // const handleFormChanges = e =>{
    //     setPaymentInfo({ 
    //         [e.target.name] : e.target.value,})
    // }

      const renderCheckoutForm = () => {
        const { shippingCountries, shippingSubdivisions, shippingOptions } = paymentInfo
        return (
            <form className="checkout__form" onChange={props.handleFormChanges}>
                <h4 className="checkout__subheading">Customer information</h4>

                    <label className="checkout__label" htmlFor="firstName">First name</label>
                    <input className="checkout__input" type="text" onChange={props.handleFormChanges}  name="firstName" placeholder="Enter your first name" required />

                    <label className="checkout__label" htmlFor="lastName">Last name</label>
                    <input className="checkout__input" type="text" onChange={props.handleFormChanges}  name="lastName" placeholder="Enter your last name" required />

                    <label className="checkout__label" htmlFor="email">Email</label>
                    <input className="checkout__input" type="text" onChange={props.handleFormChanges}   name="email" placeholder="Enter your email" required />

                <h4 className="checkout__subheading">Shipping details</h4>

                <label className="checkout__label" htmlFor="shippingName">Full name</label>
                <input className="checkout__input" type="text" onChange={props.handleFormChanges}   name="shippingName" placeholder="Enter your shipping full name" required />

                <label className="checkout__label" htmlFor="shippingStreet">Street address</label>
                <input className="checkout__input" type="text"  onChange={props.handleFormChanges}  name="shippingStreet" placeholder="Enter your street address" required />

                <label className="checkout__label" htmlFor="shippingCity">City</label>
                <input className="checkout__input" type="text" onChange={props.handleFormChanges}  name="shippingCity" placeholder="Enter your city" required />

                <label className="checkout__label" htmlFor="shippingPostalZipCode">Postal/Zip code</label>
                <input className="checkout__input" type="text" onChange={props.handleFormChanges}  name="shippingPostalZipCode" placeholder="Enter your postal/zip code" required />

                <label className="checkout__label" htmlFor="shippingCountry">Country</label>
                <select
                    name="shippingCountry"
                    className="checkout__select"
                >
                    <option disabled>Country</option>
                    <option>USA</option>
                </select>

                <label className="checkout__label" htmlFor="shippingStateProvince">State/province</label>
                <select
                    name="shippingStateProvince"
                    onChange={props.handleFormChanges}
                    className="checkout__select"
                >
                    <option className="checkout__option" disabled>State province</option>
                    {
                        Object.keys(shippingSubdivisions).map((index) => {
                            return (
                                <option  value={index} key={index}>{shippingSubdivisions[index]}</option>
                            );
                        })
                    };

                </select>

                <label className="checkout__label" htmlFor="shippingOption">Shipping method</label>
                <select
                    name="shippingOption"
                    
                    className="checkout__select"
                >
                    <option className="checkout__select-option" disabled>Select a shipping method</option>
                    <option>Free standard</option>
                </select>

                <h4 className="checkout__subheading">Payment information</h4>

                <label className="checkout__label" htmlFor="cardNum">Credit card number</label>
                <input className="checkout__input" onChange={props.handleFormChanges} type="text" name="cardNum"  value={paymentInfo.cardNum} placeholder="Enter your card number" />

                <label className="checkout__label" htmlFor="expMonth">Expiry month</label>
                <input className="checkout__input" onChange={props.handleFormChanges} type="text" name="expMonth"  value={paymentInfo.expMonth} placeholder="Card expiry month" />

                <label className="checkout__label" htmlFor="expYear">Expiry year</label>
                <input className="checkout__input" onChange={props.handleFormChanges} type="text" name="expYear"  value={paymentInfo.expYear} placeholder="Card expiry year" />

                <label className="checkout__label" htmlFor="ccv">CCV</label>
                <input className="checkout__input" onChange={props.handleFormChanges} type="text" name="ccv"  value={paymentInfo.ccv} placeholder="CCV (3 digits)" />

                <button onClick={props.handleCaptureCheckout} className="checkout__btn-confirm">Confirm order</button>
            </form>
        );
    };
      
    return (
        <div>
        checkout
            {renderCheckoutForm()}
        </div>
    );
}

export default CheckoutForm;
