import React, {useState, useEffect} from 'react';
import { commerce } from "../lib/commerce";
import Products from '../components/Products'
import  '../styles/allProducts.css'

const AllProducts = () => {

    const [products, setProducts] = useState()
    const fetchProducts = () => {
        commerce.products
          .list( {limit:200} )
          .then((products) => {
            console.log(products.data);
            setProducts({ products: products.data });
          })
          .catch((error) => {
            console.log("There was an error fetching the products", error);
          });
      };
      
      useEffect(() =>{fetchProducts()}, [])
      console.log(products)
    return (
      <div>
        <div className="hero-img"></div>
            <h4 className="list-header"> All products</h4>
        <div className="container-fluid">
        <div className="row">
          <div className="col all-prod">
            {products?   <Products products={products.products}/> : "No products this is an error"}
          </div>
        </div>
        </div>
        </div>
    );
}

export default AllProducts;
