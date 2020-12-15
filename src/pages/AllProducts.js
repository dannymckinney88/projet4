import React, {useState, useEffect} from 'react';
import { commerce } from "../lib/commerce";
import Products from '../components/Products'

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
        <div className="container-fluid">
        <div className="row">
          <div className="col all-prod">

            All products
            {products?   <Products products={products.products}/> : "No products this is an error"}
          </div>
        </div>
        </div>
    );
}

export default AllProducts;
