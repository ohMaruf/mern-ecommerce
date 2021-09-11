export function cartReducer(state = { cartItems: [] }, action) {
  let index;

  switch (action.type) {
    case "ADD_TO_CART":
      index = state.cartItems.findIndex((it) => it._id === action.payload._id);
      if (index !== -1) {
        let updatedItem = state.cartItems[index];
        updatedItem.quantity += action.payload.quantity;
        if (updatedItem.quantity > action.payload.countInStock)
          updatedItem.quantity = action.payload.countInStock;
        return {
          ...state,
          cartItems: [
            ...state.cartItems.slice(0, index),
            updatedItem,
            ...state.cartItems.slice(index + 1, state.cartItems.length),
          ],
        };
      }
      if (action.payload.quantity > action.payload.countInStock)
        action.payload.quantity = action.payload.countInStock;
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case "CHANGE_QUANTITY":
      index = state.cartItems.findIndex((it) => it._id === action.payload._id);

      let updatedItem = state.cartItems[index];
      updatedItem && (updatedItem.quantity = action.payload.quantity);
      return {
        ...state,
        cartItems: [
          ...state.cartItems.slice(0, index),
          updatedItem,
          ...state.cartItems.slice(index + 1, state.cartItems.length),
        ],
      };

    case "DELETE_ITEM":
      index = state.cartItems.findIndex((it) => it._id === action.payload._id);

      return {
        ...state,
        cartItems: state.cartItems.filter(
          (it) => it._id !== action.payload._id
        ),
      };

    case "EMPTY_CART":
      return {
        ...state,
        cartItems: []
      };
    
    default:
      return state;
  }
}
