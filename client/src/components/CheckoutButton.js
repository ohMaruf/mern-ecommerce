import "./CheckoutButton.css";
import React from "react";
import StripeCheckout from "react-stripe-checkout";
import Icon from "./Icon";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderActions";

export default function CheckoutButton({ amount, itemsCount }) {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.placeOrderReducer);
  const { success, err } = orderState;

  function _placeOrder(token) {
    dispatch(placeOrder(token, amount));
  }

  function _validate() {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/login";
      return;
    }
  }

  return (
    <StripeCheckout
      amount={amount * 100}
      token={_placeOrder}
      currency="EUR"
      stripeKey="pk_test_51JWLL9HeWVru92k2i5UezHtdeZayMjSUkadkwM7RUdB5NlCYsHs7X2chCnzj3jRSy97oqLflrkC0ZeFyvNDMKYPp00IClldVsP"
      shippingAddress
      billingAddress
      locale="it"
    >
      {success && <p className="success-message">ordine effettuato</p>}
      {err && <p className="error-message">ordine fallito</p>}
      <button id="checkoutButton" disabled={itemsCount === 0} onClick={_validate}>
        elabora ordine
        <Icon name="card" d="20" />
      </button>
    </StripeCheckout>
  );
}
