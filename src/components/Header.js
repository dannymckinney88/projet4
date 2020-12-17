import React, { useState } from "react";
import "../styles/nav.css";
import { Link } from "react-router-dom";
import Cart from "../pages/Cart";

const Header = () => {
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
                <button href="#"  className="cart-nav-btn" onClick={handleShow}> <i class="fas fa-shopping-cart fa-2x"></i></button>
                <Cart show={show} handleShow={handleShow} handleClose={handleClose}/>
            </li>
        </ul>
    </div>
      </div>
    </nav>
  );
};

export default Header;
