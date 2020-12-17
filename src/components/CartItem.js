import React from 'react';
import '../styles/cart.css'

const CartItem = (props) => {

    const {item} = props
    

 

    return (

        <div className="container-fluid">
        <div className="row">
            <div className="col">
                <img className="cart-item-img" src={item.media.source} alt={item.name} />
                <h4 className="cart-item__details-name">{item.name}</h4>
                <p> {item.price.formatted_with_symbol} </p>
            </div>
            <div className="col cart-btn-container">
                <div>
                    <button type="button"  onClick={() => props.handleUpdateCartQty(item.id, item.quantity  - 1 )} title="Reduce quantity">-</button>
                    <button type="button" onClick={() =>props.handleUpdateCartQty(item.id, item.quantity + 1 )} title="Increase quantity">+</button>
                    <p>{item.quantity}</p>
                </div>
                <div>
                    <button type="button" className="cart-item__remove" onClick={() => props.handleRemoveFromCart(item.id)}>Remove</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default CartItem;
