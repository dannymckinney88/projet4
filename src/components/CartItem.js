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
            {/* <div className="col">
            </div> */}
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
    //     <div className="cart-item">
    //     <img className="cart-item__image" src={item.media.source} alt={item.name} />
    //     <div className="cart-item__details">
    //       <h4 className="cart-item__details-name">{item.name}</h4>
    //       <div className="cart-item__details-qty">
    //         <button type="button" onClick={() => props.handleUpdateCartQty(item.id, item.quantity  - 1 )} title="Reduce quantity">-</button>
    //         <p>{item.quantity}</p>
    //         <button type="button" onClick={() =>props.handleUpdateCartQty(item.id, item.quantity + 1 )} title="Increase quantity">+</button>
    //       </div>
    //       <div className="cart-item__details-price">{item.line_total.formatted_with_symbol}</div>
    //     </div>
    //     <button type="button">Remove</button>
    //   </div>
    );
}

export default CartItem;
