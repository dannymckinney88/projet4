import React from "react";
import ProductItem from "./ProductItem"
import '../styles/products.css'

const Products = (props) => {
  console.log(props.products);
  return (
    <div className="products-container">
      {props.products
        ? props.products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        : ""}
    </div>
  );
};

export default Products;
