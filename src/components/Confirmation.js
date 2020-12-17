import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { OrderContext } from "../context/Order";

const Confirmation = (props) => {
  const [order, setOrder] = useContext(OrderContext);

//   console.log(order.order);

//   const products= ( ) =>{
//       if(order){

//           const product = order.odre.line_items.map(item =>(
//               <img src={item.media.source} alt=""/>
//           ))
//       }
//   }

  return (
    <>
      {order ? (
        <Modal
          show={props.show}
          onHide={props.handleClose}
          className="container-fluid"
        >
          <div className="row">
            <div className="col">
              <p> {order.order.shipping.name},</p>
              <p>Thank you for your oder</p>
            </div>
            <div className="col">
                {/* {products()} */}
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default Confirmation;
