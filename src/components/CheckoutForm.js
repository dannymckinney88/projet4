import React, {useState,useEffect, useContext} from 'react';
import { PaymentContext } from '../context/Payment'
// import {Elements, CardElement,}


import { commerce } from "../lib/commerce";
const CheckoutForm = (props) => {

    const [paymentInfo, setPaymentInfo] = useContext(PaymentContext)
    const [option, setOption] = useState() 
    
    let checkoutToken = props.checkoutToken
    const  fetchSubdivisions =() =>{
        console.log("fetch")
            commerce.services.localeListSubdivisions("US").then((subdivisions) => {
                console.log(subdivisions)
                setPaymentInfo({
                    
                  "shippingSubdivisions": subdivisions.subdivisions,
                })
            }).catch((error) => {
                console.log('There was an error fetching the subdivisions', error);
            });
        
    }

    const fetchShippingCountries =(checkoutTokenId) => {
        if(checkoutToken){

            commerce.services.localeListShippingCountries(checkoutToken.id).then((countries) => {
                console.log(countries)
                setPaymentInfo({ 
                shippingCountries: countries.countries,
              })
            }).catch((error) => {
              console.log('There was an error fetching a list of shipping countries', error);
            });
        }
      }

      const getShippingOptions = (checkoutTokenId, country, region = null) => {

        if (props.checkoutToken) {
            commerce.checkout.getShippingOptions(props.checkoutToken.id, {
                country: "US"
            })
                .then(res => {
                    console.log(res)
                    setOption(res[0].id)
                    let shippingOptionsArray = res.map(option => {
                        let shInfo = {}

                        shInfo.key = "US"
                        shInfo.text = `${option.description}(${option.price.formatted_with_code})`
                        shInfo.value = option.id
    
                        return shInfo
                    })
                })
                .catch(err => console.log(err))
        }
    }
    
    // useEffect(() =>{fetchShippingCountries()},[])
    useEffect(() =>{fetchSubdivisions()},[checkoutToken])

    useEffect(() =>{getShippingOptions()},[checkoutToken])

    const handleCaptureCheckout = async (e) => {
        e.preventDefault()
        const orderData = {
          line_items: checkoutToken.live.line_items,
          customer: {
            firstname: paymentInfo.firstName,
            lastname: paymentInfo.lastName,
            email: paymentInfo.email,
          },
          shipping: {
            name: paymentInfo.shippingName,
            street: paymentInfo.shippingStreet,
            town_city: paymentInfo.shippingCity,
            county_state: "AZ",
            postal_zip_code: paymentInfo.shippingPostalZipCode,
            country: "US",
          },
          fulfillment: {
            shipping_method: option
          },
          payment: {
            gateway: "test_gateway",
            card: {
              number: paymentInfo.cardNum,
              expiry_month: paymentInfo.expMonth,
              expiry_year: paymentInfo.expYear,
              cvc: paymentInfo.ccv,
              postal_zip_code: paymentInfo.shippingPostalZipCode,
            },
          },
        };
  
        console.log(checkoutToken)
        console.log(orderData)
        props.handleCaptureCheckout(checkoutToken.id, orderData);
      };
      

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
                    {/* {
                        Object.keys(shippingSubdivisions).map((index) => {
                            return (
                                <option  value={index} key={index}>{shippingSubdivisions[index]}</option>
                            );
                        })
                    } */}
                </select>

                <label className="checkout__label" htmlFor="shippingStateProvince">State/province</label>
                <select
                    name="shippingStateProvince"
                    onChange={props.handleFormChanges}
                    className="checkout__select"
                >
                    <option className="checkout__option" disabled>State province</option>
                    {checkoutToken?
                        Object.keys(shippingSubdivisions).map((index) => {
                            return (
                                <option  value={index} key={index}>{shippingSubdivisions[index]}</option>
                            );
                        }) :""
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
                <input className="checkout__input" onChange={props.handleFormChanges} type="text" name="cardNum"   placeholder="Enter your card number" required/>

                <label className="checkout__label" htmlFor="expMonth">Expiry month</label>
                <input className="checkout__input" onChange={props.handleFormChanges} type="text" name="expMonth"   placeholder="Card expiry month" required/>

                <label className="checkout__label" htmlFor="expYear">Expiry year</label>
                <input className="checkout__input" onChange={props.handleFormChanges} type="text" name="expYear"   placeholder="Card expiry year" required/>

                <label className="checkout__label" htmlFor="ccv">CCV</label>
                <input className="checkout__input" onChange={props.handleFormChanges} type="text" name="ccv"  placeholder="CCV (3 digits)" required/>

                <button onClick={(e)=>{handleCaptureCheckout(e)}} className="checkout__btn-confirm">Confirm order</button>
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
