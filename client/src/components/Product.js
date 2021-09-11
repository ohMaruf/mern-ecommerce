import React from "react";
import "./Product.css";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  return (
    <article className="card-container">
      <Link to={"product/" + product._id} className="product-link">
        <figure>
          <img src={product.image} alt={product.seller.toLowerCase()} />
        </figure>
        <span className="seller">
          <i>{product.seller.toLowerCase()}</i>
        </span>
        <header>
          <b>{product.name.substring(0, 60).toLowerCase()}</b>
        </header>
        <footer>
          <Rating rating={product.rating} />
          <span className="price-tag">&euro;{product.price.toFixed(2)}</span>
        </footer>
      </Link>
    </article>
  );
}
