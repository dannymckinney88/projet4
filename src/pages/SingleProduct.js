import React, {useState, useEffect} from 'react';
import { commerce } from "../lib/commerce";

const SingleProduct = (props) => {

    const [product, setProduct] = useState()
    console.log(props.match.params.id)
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
        <div>
            
            {product? product.description : ""}
        </div>
    );
}

export default SingleProduct;
