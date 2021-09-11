export const addToCart = (product, quantity) => (dispatch, getState) => {
  const cartItem = {
    _id: product._id,
    image: product.image,
    name: product.name,
    price: product.price,
    countInStock: product.countInStock,
    quantity: quantity,
  };

  dispatch({ type: "ADD_TO_CART", payload: cartItem });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const changeCartItemQuantity =
  (productId, quantity) => (dispatch, getState) => {
    const cartItem = {
      _id: productId,
      quantity: quantity,
    };

    dispatch({ type: "CHANGE_QUANTITY", payload: cartItem });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartReducer.cartItems)
    );
  };

export const deleteCartItem = (productId) => (dispatch, getState) => {
  dispatch({ type: "DELETE_ITEM", payload: { _id: productId } });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const emptyCart = () => (dispatch) => {
  dispatch({ type: "EMPTY_CART" });
  localStorage.setItem("cartItems", "[]");
};
