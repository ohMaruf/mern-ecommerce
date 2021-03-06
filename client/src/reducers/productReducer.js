export function getAllProductsReducer(state = { products: [] }, action) {
  switch (action.type) {
    case "GET_PRODUCTS_REQUEST":
      return { loading: true };

    case "GET_PRODUCTS_SUCCESS":
      return { products: action.payload, loading: false };

    case "GET_PRODUCTS_FAILED":
      return { error: action.payload, loading: false, err: true };

    default:
      return state;
  }
}

export function getProductByIdReducer(state = { product: [] }, action) {
  switch (action.type) {
    case "GET_PRODUCTBYID_REQUEST":
      return { loading: true };

    case "GET_PRODUCTBYID_SUCCESS":
      return { product: action.payload, loading: false };

    case "GET_PRODUCTBYID_FAILED":
      return { error: action.payload, loading: false };

    default:
      return state;
  }
}

export function addProductReviewReducer(state = {}, action) {
  switch (action.type) {
    case "ADD_PRODUCT_REVIEW_REQUEST":
      return { loading: true };
    case "ADD_PRODUCT_REVIEW_SUCCESS":
      return { loading: false, success: true };
    case "ADD_PRODUCT_REVIEW_FAILED":
      return { loading: false, err: true };
    default:
      return state;
  }
}

export function deleteProductReducer(state = { }, action) {
  switch (action.type) {
    case "DELETE_PRODUCT_REQUEST":
      return { loading: true };
    case "DELETE_PRODUCT_SUCCESS":
      return { loading: false, success: true };
    case "DELETE_PRODUCT_FAILED":
      return { loading: false, err: true };
    default:
      return state;
  }
}

export function addProductReducer(state = { }, action) {
  switch (action.type) {
    case "ADD_PRODUCT_REQUEST":
      return { loading: true };
    case "ADD_PRODUCT_SUCCESS":
      return { loading: false, success: true };
    case "ADD_PRODUCT_FAILED":
      return { loading: false, err: true };
    default:
      return state;
  }
}

export function updateProductReducer(state = { }, action) {
  switch (action.type) {
    case "UPDATE_PRODUCT_REQUEST":
      return { loading: true };
    case "UPDATE_PRODUCT_SUCCESS":
      return { loading: false, success: true };
    case "UPDATE_PRODUCT_FAILED":
      return { loading: false, err: true };
    default:
      return state;
  }
}