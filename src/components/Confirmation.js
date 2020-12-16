import React, {useContext} from 'react'
import { PaymentContext } from '../context/Payment'
import { OrderContext } from '../context/Order'
import {Modal, Button} from "react-bootstrap"

function Confirmation() {

    const [order, setOrder] = useContext(OrderContext)
    console.log(order)
    return (
        <Modal  className="container-fluid">
        <div className="row">
            <div className="col">
             
            </div>
            <div className="col">
           
            </div>
        </div>

        </Modal>

    )
}

export default Confirmation
