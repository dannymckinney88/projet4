import React, {useState, useEffect} from 'react';
import { commerce } from "../lib/commerce";


const Home = () => {
    const [products, setProducts] = useState();

    const fetchProducts = () => {
        commerce.products
          .list( {category_slug: 'Featured'} )
          .then((products) => {
            console.log(products.data);
            setProducts({ products: products.data });
          })
          .catch((error) => {
            console.log("There was an error fetching the products", error);
          });
      };

      const fetchCategories = () => {
        commerce.categories
        .list({type:"Cookies"})
        .then((category) =>{
          console.log(category.data)
        });
      };

      useEffect( () => {
         fetchProducts()
         fetchCategories();
      }, []);

    return (
        <div>
            Home
        </div>
    );
}

export default Home;
