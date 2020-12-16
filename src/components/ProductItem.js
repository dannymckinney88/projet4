import React, { useContext } from "react";
import "../styles/product.css";
import { commerce } from "../lib/commerce";
import { CartContext } from "../context/Cart";
import {Link} from "react-router-dom"

const Product = (props) => {
  const [cart, setCart] = useContext(CartContext);

  const handleAddToCart = () => {
    commerce.cart
      .add(props.product.id, 1)
      .then((item) => {
        console.log(item);
        setCart({ cart: item.cart });
      })
      .catch((error) => {
        console.error("There was an error adding the item to the cart", error);
      });
  };
  return (
    <div className="product-card">
      <img
        className="product-img"
        src={props.product.media.source}
        alt={props}
      />
      <div>
       <Link to={`/product/${props.product.id}`} style={{ textDecoration: 'none' }}> <h4 className="item-name">{props.product.name}</h4> </Link> 
      </div>
      <div >
        <p >
          {props.product.price.formatted_with_symbol}
        </p>
        <button
          name="Add to cart"
          className="product-btn"
          onClick={handleAddToCart}
        >
          Quick Add
        </button>
      </div>
    </div>
  );
};

export default Product;
