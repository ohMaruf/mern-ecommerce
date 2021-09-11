import React, { useState } from "react";
import "./Rating.css";

export default function Rating({ rating = 5, readOnly = true, updateFunction }) {

  const [value, setValue] = useState(rating)

  function _rate(val) {
    if(!readOnly) {
      setValue(val)
      updateFunction(val)
    }
  }

  return (
    <section className="rating-container">
      <div className="rating-top" style={{ width: 125 * value * 0.2 }}>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
      <div className="rating-bottom">
        <button onMouseOver={() => _rate(1)}>☆</button>
        <button onMouseOver={() => _rate(2)}>☆</button>
        <button onMouseOver={() => _rate(3)}>☆</button>
        <button onMouseOver={() => _rate(4)}>☆</button>
        <button onMouseOver={() => _rate(5)}>☆</button>
      </div>
    </section>
  );
}
