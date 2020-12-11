import React from "react";
import "../styles/hero.css";

const Hero = (props) => {
    console.log(props.class)
  return (
    <div  className={props.class_name}>
    </div>
  );
};

export default Hero;
