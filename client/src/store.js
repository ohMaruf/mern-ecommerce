import {
  addProductReducer,
  addProductReviewReducer,
  getAllProductsReducer,
  getProductByIdReducer,
  updateProductReducer,
} from "./reducers/productReducer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducer";
import { getAllUsersReducer, loginUserReducer, registerUserReducer, setPremiumUserReducer } from "./reducers/userReducer";
import { getAllOrdersReducer, getOrdersByUserIdReducer, placeOrderReducer } from "./reducers/orderReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  getAllProductsReducer: getAllProductsReducer,
  getProductByIdReducer: getProductByIdReducer,
  cartReducer: cartReducer,
  registerUserReducer: registerUserReducer,
  loginUserReducer: loginUserReducer,
  placeOrderReducer: placeOrderReducer,
  getOrdersByUserIdReducer: getOrdersByUserIdReducer,
  addProductReviewReducer: addProductReviewReducer,
  setPremiumUserReducer: setPremiumUserReducer,
  getAllUsersReducer: getAllUsersReducer,
  addProductReducer: addProductReducer,
  getAllOrdersReducer: getAllOrdersReducer,
  updateProductReducer: updateProductReducer
});

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const initialState = {
  cartReducer: { cartItems: cartItems },
  loginUserReducer: { currentUser: currentUser },
};

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
