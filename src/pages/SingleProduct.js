import React, { useState, useEffect, useContext } from "react";
import { commerce } from "../lib/commerce";
import ReactHtmlParser from "react-html-parser";
import "../styles/single.css";
import { OrderContext } from "../context/Order";
import { CartContext } from "../context/Cart";

const SingleProduct = (props) => {
  const [product, setProduct] = useState();

  const [order] = useContext(OrderContext);
  const [cart, setCart] = useContext(CartContext);
  const productId = props.match.params.id;
  const handleAddToCart = () => {
    commerce.cart
      .add(productId, 1)
      .then((item) => {
        setCart({ cart: item.cart });
      })
      .catch((error) => {
        console.error("There was an error adding the item to the cart", error);
      });
  };

  const fetchProduct = () => {
    commerce.products.retrieve(productId).then((product) => {
      setProduct(product);
    });
  };
  console.log(product);
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      {product ? (
        <div className="container-fluid">
          <div className="row product-wrapper">
            <div className="col-4">
              <h2>{product.name}</h2>
              <img
                className="product-info-img"
                src={product.media.source}
                alt=""
              />
            </div>
            <div className="col ">
              <div className=" product-info">
                <h4>Contents</h4>
                {product ? ReactHtmlParser(product.description) : ""}
              </div>
            </div>
            <div className="col-2">
              <button className="single-btn" onClick={handleAddToCart}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SingleProduct;
