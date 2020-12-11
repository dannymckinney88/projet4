import React, {useState, useEffect} from 'react';
import { commerce } from "../lib/commerce";
import CartItem from "../components/CartItem"

const Cart = () => {
    const [cart, setCart] = useState()

    const fetchCart = () =>{
        commerce.cart.retrieve().then((cart) => {
          console.log(cart)
          setCart({ cart });
        }).catch((error) => {
          console.error('There was an error fetching the cart', error);
        });
      }

      const handleUpdateCartQty = (lineItemId, quantity) => {
        console.log(lineItemId)
        console.log(quantity  )
          commerce.cart.update(lineItemId, { quantity }).then((resp) => {
            console.log(resp.cart)
            setCart({ cart: resp.cart })
          }).catch((error) => {
            console.log('There was an error updating the cart items', error);
          });
        }

      useEffect(()=>{fetchCart()},[])

    //   console.log(cart.cart)
      const renderEmptyCart = () =>{
        // const items = cart.cart
         if(cart.cart.total_unique_items > 0){
             return;
         }

         return (
            <p className="cart__none">
              You have no items in your shopping cart, start adding some!
            </p>
          );
    }

    const renderCart = () =>{
        if(cart){
          if(cart.cart.total_unique_items === 0){
              return;
          }

        }
      return (
          <>
            { cart? cart.cart.line_items.map(lineItem => (
              <CartItem
                item={lineItem}
                key={lineItem.id}
                className="cart__inner"
                handleUpdateCartQty= {handleUpdateCartQty}
              />
            )):"" }
            <div className="col-sm-8">
              <p className="cart__total-title">Subtotal:</p>
              <p className="cart__total-price">{cart ? cart.cart.subtotal.formatted_with_symbol : ""}</p>
            </div>
          </>
        );
  }


    return (
        <div className="container-fluid">
            <div className="row">
                { renderCart() }

            </div>

        </div>
    );
}

export default Cart;
