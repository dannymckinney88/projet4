import React, {useState, useEffect} from 'react';
import { commerce } from "../lib/commerce";
import Products from '../components/Products'

const AllProducts = () => {

    const [products, setProducts] = useState()
    const fetchProducts = () => {
        commerce.products
          .list(  )
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
            All products
            {products?   <Products products={products.products}/> : "No products this is an error"}
        </div>
    );
}

export default AllProducts;
