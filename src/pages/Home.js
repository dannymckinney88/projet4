import React, { useState, useEffect } from "react";
import { commerce } from "../lib/commerce";
import Hero from "../components/Hero";
import Products from "../components/Products";
import "../styles/home.css";

const Home = () => {
  const [products, setProducts] = useState();

  const fetchFeatProducts = () => {
    commerce.products
      .list({ category_slug: "Featured" })
      .then((products) => {
        // console.log(products.data);
        setProducts({ products: products.data });
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      });
  };

  const fetchCategories = () => {
    commerce.categories.list({ type: "Cookies" }).then((category) => {
      //   console.log(category.data)
    });
  };

  useEffect(() => {
    fetchFeatProducts();
    fetchCategories();
  }, []);
  console.log(products);
  return (
    <>
      <Hero class_name="hero-img-home" />
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="featured-container">
              <h4 className="featured">Featured</h4>
              {products ? <Products products={products.products} /> : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
