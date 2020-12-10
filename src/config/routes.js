/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../pages/Home"
import SingleProduct from "../pages/SingleProduct"
import AllProducts from "../pages/AllProducts"
import Cart from "../pages/Cart"

export default (props) =>(
    <Switch>
         <Route exact path='/' component={Home} />
         <Route  path='/product/:id' component={SingleProduct} />
         <Route  path='/allproducts' component={AllProducts} />
         <Route  path='/cart' component={Cart} />
    </Switch>
)