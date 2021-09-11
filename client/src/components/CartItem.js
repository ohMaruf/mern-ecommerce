import "./CartItem.css";
import React from "react";
import { changeCartItemQuantity, deleteCartItem } from "../actions/cartActions";
import { useDispatch } from "react-redux";
import Icon from "./Icon";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  function _changeCartItemQuantity(e) {
    dispatch(changeCartItemQuantity(item._id, e.target.value));
  }

  function _removeCartItem() {
    dispatch(deleteCartItem(item._id));
  }

  return (
    <article className="cart-item">
      <figure>
        <img src={item.image} alt={item.name.toLowerCase()} />
      </figure>
      <div className="cart-item-2">
        <h4>{item.name.toLowerCase()}</h4>
        <p>
          quantit&agrave;:
          <select
            defaultValue={item.quantity}
            onChange={_changeCartItemQuantity}
          >
            {[...Array(item.countInStock).keys()].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </p>
      </div>
      <div className="cart-item-3">
        <button onClick={_removeCartItem}>
          <Icon name="delete" />
        </button>
        <span>&euro;{(item.quantity * parseFloat(item.price)).toFixed(2)}</span>
      </div>
    </article>
  );
}
