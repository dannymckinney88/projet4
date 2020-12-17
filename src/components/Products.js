import React from "react";
import ProductItem from "./ProductItem";
import "../styles/products.css";

const Products = (props) => {

  return (
    <div className="container-fluid">
      <div className="row product-container">
      {props.products
        ? props.products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        : ""}
        
      </div>
    </div>
  );
};

export default Products;
