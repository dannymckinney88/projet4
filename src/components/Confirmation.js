import React, { useContext } from "react";
import { PaymentContext } from "../context/Payment";
import { OrderContext } from "../context/Order";
import { Modal, Button } from "react-bootstrap";

function Confirmation() {
  const [order, setOrder] = useContext(OrderContext);
  console.log(order);
  return (
    <>
      <form>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="personal-info">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="name"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter first name"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="name"
                    className="form-control"
                    placeholder="Enter last name"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <label for="ccn">Credit Card Number</label>
              <input
                className="form-control"
                type="tel"
                inputmode="numeric"
                pattern="[0-9\s]{13,19}"
                autocomplete="cc-number"
                maxlength="19"
                placeholder="xxxx xxxx xxxx xxxx"
              ></input>
                <label for="ccn">CCV</label>
              <input
                className="form-control"
                type="tel"
                inputmode="numeric"
                pattern="[0-9\s]"
                autocomplete="cc-number"
                maxlength="3"
                placeholder="Enter 3 digit code"
              ></input>
              <div className="date">
              <div className="form-group">
                  <label>Month</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                  />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
              <div className="col cc">
              <label for="ccn">Credit Card Number</label>
              <input
                className="form-control"
                type="tel"
                inputmode="numeric"
                pattern="[0-9\s]{13,19}"
                autocomplete="cc-number"
                maxlength="19"
                placeholder="xxxx xxxx xxxx xxxx"
              ></input>
                <label for="ccn">CCV</label>
              <input
                className="form-control"
                type="tel"
                inputmode="numeric"
                pattern="[0-9\s]"
                autocomplete="cc-number"
                maxlength="3"
                placeholder="Enter 3 digit code"
              ></input>
              <div className="date">
              <div className="form-group">
                  <label>Month</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                  />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                  />
                </div>
              </div>
              </div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default Confirmation;
