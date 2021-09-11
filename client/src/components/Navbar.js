import React from "react";
import "./Navbar.css";
import Icon from "./Icon";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../actions/productActions";

export default function Navbar({ isPremium }) {
  const dispatch = useDispatch();

  let logo = isPremium ? "/obaPremiumLogo.gif" : "/obamiumLogo.png";
  const cartReducer = useSelector((state) => state.cartReducer);
  const { cartItems } = cartReducer;

  const currentUser = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : null;

  function _filterProducts(e) {
    e.preventDefault();
    dispatch(
      filterProducts(
        e.target.searchKey.value,
        e.target.sortKey.value,
        e.target.category.value
      )
    );
  }

  return (
    <nav className="navbar">
      <a className="logo" href="/">
        <img src={window.location.origin + logo} alt="logo" />
        <h4>{isPremium ? "obaPremium" : "obamium"}</h4>
      </a>
      <section
        className="item search right"
        tabIndex="0"
        style={{
          visibility: window.location.pathname === "/" ? "visible" : "hidden",
        }}
      >
        <form
          name="searchForm"
          className="search-group"
          onSubmit={_filterProducts}
        >
          <select
            defaultValue="1"
            id="sortKey"
            onChange={() => document.getElementById("searchSubmit").click()}
          >
            <option value="stars">★</option>
            <option value="lth">&euro;↓</option>
            <option value="htl">&euro;↑</option>
          </select>
          <select
            defaultValue="1"
            id="category"
            onChange={() => document.getElementById("searchSubmit").click()}
          >
            <option value="all">tutto</option>
            <option value="electronics">elettronica</option>
            <option value="art">arte</option>
            <option value="it">IT</option>
            <option value="clothing">abbigliamento</option>
            <option value="home">casa</option>
            <option value="other">altro</option>
          </select>
          <input
            id="searchKey"
            type="text"
            placeholder="prodotto da cercare..."
            autoComplete="off"
          />
          <button value="submit">
            <Icon name="search" />
          </button>
          <input type="submit" hidden id="searchSubmit" />
        </form>
      </section>

      <a href={`${window.location.origin}/profile`} className="item">
        <section className="group">
          <div className="detail">
            <div className="sub">
              {currentUser ? currentUser.name : "accedi"}
            </div>
          </div>
          <Icon name="profile" />
        </section>
      </a>

      <a href={`${window.location.origin}/cart`} className="item">
        <section className="group">
          <div className="detail">carrello</div>
          <div className="cart-icon-container">
            <Icon name="cart" />
            <div className="cart-number">{cartItems.length}</div>
          </div>
        </section>
      </a>
    </nav>
  );
}
