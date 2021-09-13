import "./ProductDescription.css";
import Rating from "../components/Rating";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import Loader from "../components/Loader";
import Icon from "../components/Icon";
import ReviewSection from "../components/Review";

export default function ProductDescription({ match }) {
  const productId = match.params.id;
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const getProductByIdState = useSelector(
    (state) => state.getProductByIdReducer
  );
  const { loading, product, error } = getProductByIdState;

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  function _addToCart() {
    dispatch(addToCart(product, quantity));
  }

  return (
    <main>
      {loading && <Loader />}
      {error && <h1>qualcosa &egrave; andato storto</h1>}
      {product && (
        <div>
          <section className="product-description">
            <section className="col-1">
              <figure className="card image-container">
                <img
                  src={product.image}
                  alt={`${product.name}`.toLowerCase()}
                />
              </figure>
            </section>
            <section className="col-2">
              <article className="card">
                <h2>{`${product.name}`.toLowerCase()}</h2>
              </article>
              <article className="card" id="orderInfo">
                <b>&euro;{product.price.toFixed(2)}</b>
                <select
                  defaultValue={quantity || 0}
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  {[...Array(product.countInStock).keys()].map((v, index) => {
                    return (
                      <option value={index + 1} key={index}>
                        {index + 1}
                      </option>
                    );
                  })}
                </select>
                <button onClick={_addToCart}>
                  <span>agguingi al carrello</span>
                  <Icon name="cart" d="20" />
                </button>
              </article>
              <article className="card description">
                <h3 style={{ marginBottom: "10px" }}>descrizione</h3>
                <p>{product.description}</p>
              </article>
              <article className="card">
                <h3>valutazione</h3>
                <Rating rating={product.rating} />
              </article>
            </section>
          </section>
          <article className="card review-container">
            <ReviewSection product={product}/>
          </article>
        </div>
      )}
    </main>
  );
}
