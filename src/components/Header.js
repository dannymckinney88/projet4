import React from "react";
import '../styles/nav.css'
import {Button} from 'react-bootstrap'

const Header = () => {
  return (
   <header className="navbar">
    <p>logo</p>
    <p>All products</p>
    <p>cart</p>
    <Button>hit me</Button>
   </header>
  );
};

export default Header;
