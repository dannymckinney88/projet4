import React, {useState,useEffect, useContext} from 'react';
import { PaymentContext } from '../context/Payment'
import Confirmation from './Confirmation'
import '../styles/form.css'

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
        console.log(checkoutToken.live)
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
      
    const renderCheckoutForm = () =>{
             const { shippingCountries, shippingSubdivisions, shippingOptions } = paymentInfo
        return(
        <>
        <form onChange={props.handleFormChanges}>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
              <h6>Personal info</h6>
                <div className="personal-info">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                    onChange={props.handleFormChanges}
                      type="name"
                      name="firstName"
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                    onChange={props.handleFormChanges}
                      type="name"
                      name="lastName"
                      className="form-control"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                    name="email"
                    onChange={props.handleFormChanges}
                      type="email"
                      className="form-control"
                      placeholder="email"
                    />
                  </div>
                </div>
              </div>
              <div className="col">
              <h6>shipping info</h6>
              <div className="form-group">
                    <label>Full name</label>
                    <input
                    name="shippingName"
                    onChange={props.handleFormChanges}
                      type="email"
                      className="form-control"
                      placeholder="email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Street address</label>
                    <input
                    name="shippingStreet"
                    onChange={props.handleFormChanges}
                      type="email"
                      className="form-control"
                      placeholder="email"
                    />
                  </div>
                <div className="coutnry">
                <div className="form-group">
                    <label>City</label>
                    <input
                    name="shippingCity"
                    onChange={props.handleFormChanges}
                      type="email"
                      className="form-control"
                      placeholder="Enter city"
                    />
                  </div>


                  <select
                      name="shippingStateProvince"
                      onChange={props.handleFormChanges}
                      className="custom-select w-25 mt-3"
                  >
                      <option className="checkout__option" disabled>Select state</option>
                      {checkoutToken?
                          Object.keys(shippingSubdivisions).map((index) => {
                              return (
                                  <option  value={index} key={index}>{shippingSubdivisions[index]}</option>
                              );
                          }) :""
                      };
  
                  </select>

                  <select
                    name="shippingCountry"
                    className="custom-select w-25 mt-3"
                >
                    <option disabled>Country</option>
                    <option>USA</option>
                </select>

                </div>
                  <div className="form-group">
                    <label>Postal/Zip code</label>
                    <input
                     name="shippingPostalZipCode"
                    onChange={props.handleFormChanges}
                      type="email"
                      className="form-control"
                      placeholder="Enter zipcode"
                    />
                  </div>
              </div>
            </div>
            <div className="row">
                <div className="col cc">
              
                <div className="form-group w-50">
                <label for="ccn">Credit Card Number</label>
                    <input
                    onChange={props.handleFormChanges}
                  className="form-control"
                  type="tel"
                  name="cardNum"
                  inputmode="numeric"
                  pattern="[0-9\s]{13,19}"
                  autocomplete="cc-number"
                  maxlength="19"
                  placeholder="xxxx xxxx xxxx xxxx"
                ></input>
                  </div>
                  <div className="form-group w-25">
                  <label for="ccn">CCV</label>
                  <input
                  className="form-control"
                  onChange={props.handleFormChanges}
                  type="tel"
                  inputmode="numeric"
                  pattern="[0-9\s]"
                  autocomplete="cc-number"
                  maxlength="3"
                  name="ccv"
                  placeholder="Enter 3 digit code"
                ></input>
                  </div>
               
                  
            
                <div className="date">
                <div className="form-group w-25">
                    <label>Month</label>
                    <input
                    onChange={props.handleFormChanges}
                      name="expMonth"
                      maxlength="2"
                      type="text"
                      className="form-control"
                      placeholder="12"
                    />
                  </div>
                  <div className="form-group w-25">
                    <label>Year</label>
                    <input
                    onChange={props.handleFormChanges}
                      name="expYear" 
                      maxlength="4"
                      type="text"
                      className="form-control"
                      placeholder="2020"
                    />
                  </div>
                </div>
                </div>
            </div>
          </div>
  
          <button onClick={(e)=>{handleCaptureCheckout(e)}} class="btn btn-primary">
            Submit
          </button>
        </form>
      </>)
    }
      console.log(paymentInfo)
    return (
        // <>

        // </>
        <div>
        checkout
            {renderCheckoutForm()}
            {/* <Confirmation/> */}
        </div>
    );
}

export default CheckoutForm;
