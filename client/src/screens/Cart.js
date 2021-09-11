import "./Cart.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import CartItem from "../components/CartItem";
import CheckoutButton from "../components/CheckoutButton";
import { emptyCart } from "../actions/cartActions";

export default function Cart() {
  const dispatch = useDispatch()
  const cartState = useSelector((state) => state.cartReducer);
  const orderState = useSelector(state => state.placeOrderReducer)
  const { loading, success } = orderState
  const { cartItems } = cartState;

  useEffect(() => {
    success && dispatch(emptyCart(success))
  }, [dispatch, success])

  let subTotal = 0;

  return (
    <main>
      {loading && <Loader />}
      <section className="cart-container">
      <section className="col">
        {cartItems.map((it, index) => {
          subTotal += parseFloat(it.price) * it.quantity;
          return <CartItem item={it} key={index} />;
        })}
      </section>
      <section className="col">
        <section className="cart-payment">
          <h2>il tuo carrello</h2>
          <br />
          {[...Array(cartItems.length).keys()].map((it, index) => (
            <p className="" key={index}>
              {(
                cartItems[index].quantity * parseFloat(cartItems[index].price)
              ).toFixed(2)}{" "}
              &euro;
            </p>
          ))}
          <hr />
          <p>
            totale: <b>{subTotal.toFixed(2)} &euro;</b>
          </p>
        </section>
        <CheckoutButton amount={subTotal} itemsCount={cartItems.length}/>
      </section>
      </section>
    </main>
  );
}
