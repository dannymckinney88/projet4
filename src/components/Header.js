import React, {useState, useEffect} from "react";
import {Button} from 'react-bootstrap'
import '../styles/nav.css'
import {Link} from "react-router-dom"
import Cart from '../pages/Cart'


const Header = (props) => {
    // console.log(props.cart)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
<nav className="navbar navbar-expand-md navbar-dark bg-dark">
    <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
            <Link to={'/'}> Home </Link>
            </li>
        </ul>
    </div>
    <div className="mx-auto order-0">
        <h6 className="navbar-brand mx-auto" href="#">Danny's sweet shack</h6>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
            <span className="navbar-toggler-icon"></span>
        </button>
    </div>
    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link to={'/allproducts'}>   All Product </Link>
            </li>
            <li className="nav-item">
                {/* <Link to={'/cart'}>  Cart </Link> */}
                <Button variant="primary" onClick={handleShow}>
                Launch demo modal
                </Button>
                <Cart show={show} handleShow={handleShow} handleClose={handleClose}/>
            </li>
        </ul>
    </div>
</nav>
  );
};

export default Header;
