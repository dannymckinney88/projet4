import React from 'react';
import '../styles/footer.css'

const Footer = () => {
    return (
        <footer className="footer-container">
              <p className="footer-text"> ©Danny Mckinney</p>
              <a  href="https://github.com/dannymckinney88/sweet-treats"> <i className="fab fa-github-square footer-icon"> </i> </a>
              <a  href="https://www.linkedin.com/in/danny-mckinney-b19b29168/"> <i className="fab fa-linkedin footer-icon"></i> </a>
        </footer>
    );
}

export default Footer;
