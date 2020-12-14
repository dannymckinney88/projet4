import React, {useState, useEffect, useContext} from 'react';
import { CartContext } from './context/Cart'
import Header from './components/Header'
import Routes from './config/routes'
import { CartContextProvider } from "./context/Cart"

import { commerce } from "./lib/commerce";





const App = () => {
  
  const [cart] = useContext(CartContext)
  const [checkoutToken, setCheckoutToken] = useState()

//   const generateCheckoutToken = () => {
//     // console.log(cart.cart)
  
//       commerce.checkout.generateToken(cart.cart.id, { type: 'cart' })
//       .then((token) => {
//         console.log(token)
//         setCheckoutToken(token);})
//         // .then(() =>fetchShippingCountries(checkoutToken.id))
//         .catch((error) => {
//           console.log('There was an error in generating a token', error);
//         });
    
//       // // console.log(checkoutToken.id)
// }
  // useEffect(() => generateCheckoutToken(),[])


  return (
    <div>
     {/* <CartContextProvider> */}
         <Header cart={checkoutToken}/>
         <Routes checkout={checkoutToken}/>
     {/* </CartContextProvider> */}
    </div>
  );
}

export default App;