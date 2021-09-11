export function placeOrderReducer(state = {}, action) {
  switch (action.type) {
    case "PLACE_ORDER_REQUEST":
      return { loading: true };

    case "PLACE_ORDER_SUCCESS":
      return { loading: false, success: true };

    case "PLACE_ORDER_FAILED":
      return { loading: false, err: true };

    default:
      return state;
  }
}

export function getOrdersByUserIdReducer(state = {}, action) {
  switch (action.type) {
    case "GET_ORDERSBYID_REQUEST":
      return { loading: true };

    case "GET_ORDERSBYID_SUCCESS":
      return { loading: false, orders: action.payload };

    case "GET_ORDERSBYID_FAILED":
      return { loading: false, err: true };

    default:
      return state;
  }
}

export function getAllOrdersReducer(state = {}, action) {
  switch (action.type) {
    case "GET_ALLORDERS_REQUEST":
      return { loading: true };
    case "GET_ALLORDERS_SUCCESS":
      return { loading: false, orders: action.payload };
    case "GET_ALLORDERS_FAILED":
      return { loading: false,  err: true };
    default:
      return state;
  }
}
