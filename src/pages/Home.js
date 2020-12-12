import React, {useState, useEffect} from 'react';
import { commerce } from "../lib/commerce";
import Hero from '../components/Hero'
import Products from '../components/Products'


const Home = () => {
    const [products, setProducts] = useState();

    const fetchFeatProducts = () => {
        commerce.products
          .list( {category_slug: 'Featured'} )
          .then((products) => {
            // console.log(products.data);
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
        //   console.log(category.data)
        });
      };

      useEffect( () => {
         fetchFeatProducts()
         fetchCategories();
      }, []);
      console.log(products)
    return (    
        <div className="container-fluid">
        <Hero class_name="hero-img-home"/>
        {products?   <Products products={products.products}/> : ""}
      
        </div>
    );
}

export default Home;
