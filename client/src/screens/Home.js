import "./Home.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { getAllProducts } from "../actions/productActions";
import Loader from "../components/Loader";

export default function Home() {
  const dispatch = useDispatch();
  const getAllProductsState = useSelector(
    (state) => state.getAllProductsReducer
  );
  const { loading, products, error } = getAllProductsState;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <main>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Qualcosa è andato storto, ricaricare la pagina</h1>
      ) : (
        <article className="wrapper-grid">
          {products &&
            products.map((it, index) => <Product product={it} key={index} />)}
        </article>
      )}
    </main>
  );
}
