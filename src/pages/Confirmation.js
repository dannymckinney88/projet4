import React, {useContext} from 'react'
import { PaymentContext } from '../context/Payment'
import { OrderContext } from '../context/Order'
import {Modal, Button} from "react-bootstrap"

function Confirmation(props) {

    const [order, setOrder] = useContext(OrderContext)
    // console.log(order)
    console.log(props.show)
    return (
        <Modal  show={props.show} className="container-fluid">
        <div className="row">
            <div className="col">
             tests
            </div>
            <div className="col">
           22323
            </div>
        </div>

        </Modal>

    )
}

export default Confirmation
