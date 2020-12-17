import React, {useContext, useEffect} from "react";
import { commerce } from "../lib/commerce";
import {Link} from "react-router-dom"
import { CartContext } from '../context/Cart'
import CartItem from "../components/CartItem"
import {Modal, Button} from "react-bootstrap"
import '../styles/cart.css'

const Cart = (props) => {
    const [cart, setCart] = useContext(CartContext)

// Api calls 
      const handleUpdateCartQty = (lineItemId, quantity) => {
        // console.log(lineItemId)
        // console.log(quantity  )
          commerce.cart.update(lineItemId, { quantity }).then((resp) => {
            console.log(resp.cart)
            setCart({ cart: resp.cart })
          }).catch((error) => {
            console.log('There was an error updating the cart items', error);
          });
        }
        //  Removes from cart
        const handleRemoveFromCart =(lineItemId)=> {
            commerce.cart.remove(lineItemId).then((resp) => {
             setCart({
                cart: resp.cart
              })
            }).catch((error) => {
              console.error('There was an error removing the item from the cart', error);
            });
        }

      // useEffect(()=>{fetchCart()},[])

// Renders a cart
      const renderEmptyCart = () =>{
        // const items = cart.cart
        if(cart){

            if(cart.cart.total_unique_items > 0){
                return;
            }
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

          console.log(cart.cart)
        }
      return (
          <>
            { cart? cart.cart.line_items.map(lineItem => (
              <CartItem
                item={lineItem}
                key={lineItem.id}
                className="cart__inner"
                handleUpdateCartQty= {handleUpdateCartQty}
                handleRemoveFromCart= {handleRemoveFromCart}
              />
            )):"" }
          </>
        );
  }


    return (
        
            <Modal show={props.show} onHide={props.handleClose} className="container-fluid">
            <div className="row">
                <div className="col">
                    { renderCart() }
                    { renderEmptyCart() }
                </div>
                <div className="col">
                    <p className="cart__total-title">Subtotal:</p>
                    <p className="cart__total-price">{cart ? cart.cart.subtotal.formatted_with_symbol : ""}</p>
                    {cart ?  <Link to={`/checkout/${cart.cart.id}`} onClick={props.handleClose}>  Checkout </Link> : ""}
                </div>
            </div>

            </Modal>

        
    );
}

export default Cart;
