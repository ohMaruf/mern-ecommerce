import "./Profile.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserId } from "../actions/orderActions";
import Loader from "../components/Loader";
import Order from "../components/Order";
import { setPremiumUser } from "../actions/userActions";

export default function Profile({ isPremium = false }) {
  const dispatch = useDispatch();
  const premiumRequestState = useSelector(
    (state) => state.setPremiumUserReducer
  );
  const orderState = useSelector((state) => state.getOrdersByUserIdReducer);
  const { orders, loading, err } = orderState;
  if (!localStorage.getItem("currentUser")) window.location.href = "/login";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    dispatch(getOrdersByUserId());
  }, [dispatch]);

  function _setPremiumUser() {
    dispatch(setPremiumUser(currentUser));
  }

  function logout() {
    localStorage.removeItem("currentUser");
    window.location.reload();
  }

  return (
    <main>
      {(loading || premiumRequestState.loading) && <Loader />}
      <section className="profile-orders">
        <h2>profilo</h2>
        <section className="profile-card profile-user">
          <div>
            <div>
              <span>nome utente: </span> {currentUser.name}
            </div>
            <div>
              <span>email: </span> {currentUser.email}
            </div>
          </div>
          <button id="logout" onClick={logout}>disconnettiti</button>
        </section>
        <section className="profile-card">
          <div className="premium-header">
            <div>
              <img
                src={window.location.origin + "/obaPremiumLogo.gif"}
                alt="logo"
              />
              <h1>obaPremium</h1>
            </div>
            <button
              id="premium-button"
              onClick={_setPremiumUser}
              disabled={isPremium}
            >
              abbonati ora
            </button>
          </div>
          {isPremium ? (
            <span className="obapremium-message">sei un membro obaPremium</span>
          ) : (
            <span className="obamium-message">
              {premiumRequestState.err
                ? "abbonamento non riuscito"
                : "non sei ancora un membro obaPremium"}
            </span>
          )}
          <span>vantaggi:</span>
          <ul>
            <li>nessuno</li>
            <li>logo animato</li>
            <li>il logo animato è l'unico vantaggio</li>
            <li>leggi il secondo punto</li>
            <li>valido fino alla morte di obama (non è vero)</li>
            <li>diventi figo</li>
          </ul>
        </section>
        <br />
        <h2>i miei ordini</h2>
        {orders && orders.length === 0 && <Order />}
        {orders && orders.map((it, index) => <Order order={it} key={index} />)}
        {err && <p className="order-error">qualcosa è andato storto</p>}
      </section>
    </main>
  );
}
