import axios from "axios";

export const placeOrder = (token, subTotal) => (dispatch, getState) => {
  const currentUser = getState().loginUserReducer.currentUser;
  const orderItems = getState().cartReducer.cartItems.map(
    ({ countInStock, ...attrs }) => attrs
  );

  console.log(orderItems);

  dispatch({ type: "PLACE_ORDER_REQUEST" });

  axios
    .post("/api/orders/placeorder", {
      token,
      subTotal,
      currentUser,
      orderItems,
    })
    .then((res) => {
      dispatch({ type: "PLACE_ORDER_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: "PLACE_ORDER_FAILED" });
    });
};

export const getOrdersByUserId = () => (dispatch, getState) => {
  const userId = getState().loginUserReducer.currentUser._id;
  dispatch({ type: "GET_ORDERSBYID_REQUEST" });

  axios
    .post("api/orders/getordersbyuserid", { userId: userId })
    .then((res) => {
      dispatch({ type: "GET_ORDERSBYID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_ORDERSBYID_FAILED" });
    });
};

export const getAllOrders = () => (dispatch) => {
  dispatch({ type: "GET_ALLORDERS_REQUEST" });

  axios
    .get("/api/orders/getallorders")
    .then((res) => {
      dispatch({ type: "GET_ALLORDERS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_ALLORDERS_FAILED" });
    });
}