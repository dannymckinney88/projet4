import React from 'react';

const CartItem = (props) => {

    const {item} = props

    return (
        <div className="">
        <img className="cart-item__image" src={item.media.source} alt={item.name} />
        <div className="cart-item__details">
          <h4 className="cart-item__details-name">{item.name}</h4>
          <div className="cart-item__details-qty">
            <button type="button" onClick={() => props.handleUpdateCartQty(item.id, item.quantity  - 1 )} title="Reduce quantity">-</button>
            <p>{item.quantity}</p>
            <button type="button" onClick={() =>props.handleUpdateCartQty(item.id, item.quantity + 1 )} title="Increase quantity">+</button>
          </div>
          <div className="cart-item__details-price">{item.line_total.formatted_with_symbol}</div>
        </div>
        <button type="button">Remove</button>
      </div>
    );
}

export default CartItem;
