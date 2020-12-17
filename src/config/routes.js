/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import SingleProduct from "../pages/SingleProduct";
import AllProducts from "../pages/AllProducts";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

export default (props) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/product/:id" component={SingleProduct} />
    <Route path="/allproducts" component={AllProducts} />
    <Route path="/cart" component={Cart} />
    {/* <Route  path='/checkout' component={Checkout} /> */}
    <Route
      path="/checkout/:cartId"
      render={(routeComponentProps) => {
        return (
          <Checkout
            {...routeComponentProps}
            //more props to come here
            cart={props.cart}
            checkout={props.checkout}
          />
        );
      }}
    />
  </Switch>
);
