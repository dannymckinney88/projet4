import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../styles/nav.css";
import { Link } from "react-router-dom";
import Cart from "../pages/Cart";
import logo from "../img/logo.png";

const Header = (props) => {
  // console.log(props.cart)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    //   <>
    //   </>

    <nav>
      <div className="nav-wrapper">
        <div>
          <ul className="nav-left">
            <li >
              <Link to={"/"} style={{ textDecoration: 'none' }}> <p className="navbar-link">Home</p>  </Link>
            </li>
            <li >
              <Link to={"/allproducts"} style={{ textDecoration: 'none' }}> <p className="navbar-link">All products</p> </Link>
            </li>
          </ul>
        </div>
        <div className="nav-mid">
          <h6 className="nav-logo" href="#">
          Danny's Delicious Deserts
          </h6>
          {/* <img src={logo} alt="" className="nav-logo"/> */}
        </div>
        <div className="nav-right">
        <ul >
            <li>
                <a variant="primary" onClick={handleShow}> <i class="fas fa-shopping-cart fa-2x"></i></a>
                <Cart show={show} handleShow={handleShow} handleClose={handleClose}/>
            </li>
        </ul>
    </div>
      </div>
      {/* <nav className="navbar  navbar-dark bg-dark">
    <div >
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
            <Link to={'/'}> Home </Link>
            </li>
            <li className="nav-item">
                <Link to={'/allproducts'}>   All Product </Link>
            </li>
        </ul>
    </div>
    <div >
        <h6 className="navbar-brand mx-auto" href="#">Danny's sweet shack</h6>
    </div>
    <div className="navbar">
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a variant="primary" onClick={handleShow}> <i class="fas fa-shopping-cart fa-2x"></i></a>
                <Cart show={show} handleShow={handleShow} handleClose={handleClose}/>
            </li>
        </ul>
    </div>
</nav> */}
    </nav>
  );
};

export default Header;
