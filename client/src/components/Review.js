import "./Review.css";
import React, { useState } from "react";
import Rating from "./Rating";
import { useDispatch } from "react-redux";
import { addProductReview } from "../actions/productActions";

export default function ReviewSection({ product }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewStatus, setReviewStatus] = useState("");

  function _review() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      window.location.href = "/login";
      return;
    }
    let alreadyReviewd = false;
    for (let i = 0; i < product.reviews.length; i++) {
      if (product.reviews[i].userId === currentUser._id) {
        alreadyReviewd = true;
        break;
      }
    }
    if (alreadyReviewd) {
      setReviewStatus("err");
      return;
    }
    const review = { rating: rating, comment: comment };
    dispatch(addProductReview(review, product._id));
    setReviewStatus("good");
  }

  return (
    <section className="review-section">
      <h3>aggiungi una recensione</h3>
      {reviewStatus === "err" && (
        <p className="review-error">hai già recensito questo prodotto</p>
      )}
      {reviewStatus === "good" && (
        <p className="review-success">recensione aggiunta con successo</p>
      )}
      <Rating rating={rating} readOnly={false} updateFunction={setRating} />
      <textarea
        rows="4"
        cols="79"
        maxLength="300"
        placeholder="lascia un commento... (facoltativo)"
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="submit-btn" onClick={_review}>
        pubblica
      </button>
      <br />
      <h3>recensioni</h3>
      {product.reviews &&
        product.reviews.map((it, index) => {
          return <Review review={it} key={index} />;
        })}
    </section>
  );
}

function Review({ review }) {
  return (
    <article className="review">
      <b style={{ fontSize: 14 + "px" }}>{review.name}</b>
      <br />
      <br />
      <div className="rating-container">
        <Rating rating={review.rating} />
      </div>
      <span>{review.comment}</span>
    </article>
  );
}
