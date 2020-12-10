import React from "react";
import '../styles/nav.css'
import {Navbar, Nav, NavDropdown} from "react-bootstrap"
import {Link} from "react-router-dom"


const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
     <Link to={'/'}> <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> </Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
   <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link to={'/allproducts'}>   <Nav.Link href="#link">All Product</Nav.Link> </Link>
        <Link to={'/cart'}>   <Nav.Link href="#link">Cart</Nav.Link> </Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
};

export default Header;
