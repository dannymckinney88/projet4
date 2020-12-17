import React, {useState, useEffect} from 'react';
import { commerce } from "../lib/commerce";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import "../styles/single.css"


const SingleProduct = (props) => {

    const [product, setProduct] = useState()

    // console.log(product.description)
    const fetchProduct = () =>{
        const productId = props.match.params.id
        commerce.products.retrieve(productId)
        .then((product) => {
            console.log(product)
            setProduct(product)
        });

    }
    console.log(product)
    useEffect( () =>{fetchProduct()},[])
    return (
        <>
        {product? 
            <div className="container-fluid">
            <div className="row product-wrapper">
                <div className="col">
                    <img src={product.media.source} alt=""/>
                </div>
                <div className="col product-info">
                    <h4>Contents</h4>
                    {product? ReactHtmlParser(product.description) : ""}
                </div>
            </div>
        </div>
            : ""
        }
        </>
    );
}

export default SingleProduct;
