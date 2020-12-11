import React from "react";
import "../styles/product.css"
const Product = (props) => {
    console.log(props.product)
  return (
    <div className="product-card">
      <img className="product-img" src={props.product.media.source} alt={props}/>
      <div>
      <h4 className="props.product__name">{props.product.name}</h4>
      </div>
    </div>
//     <div className="card" style={{width:18 + "rem"}}>
//   <img className="card-img-top" src={props.product.media.source} alt="Card image cap"/>
//   <div className="card-body">
//     <h5 className="card-title">Card title</h5>
//     <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" className="btn btn-primary">Go somewhere</a>
//   </div>
// </div>
  );
};

export default Product;
