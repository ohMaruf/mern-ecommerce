import axios from "axios";

export const getAllProducts = () => (dispatch) => {
  dispatch({ type: "GET_PRODUCTS_REQUEST" });

  axios
    .get("/api/products/getallproducts")
    .then((res) => {
      let productsList = res.data.sort((a, b) => b.rating - a.rating);
      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: productsList });
    })
    .catch((err) => {
      dispatch({ type: "GET_PRODUCTS_FAILED", payload: err });
    });
};

export const getProductById = (productId) => (dispatch) => {
  dispatch({ type: "GET_PRODUCTBYID_REQUEST" });

  axios
    .post("/api/products/getproductbyid", { productId })
    .then((res) => {
      dispatch({ type: "GET_PRODUCTBYID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_PRODUCTBYID_FAILED", payload: err });
    });
};

export const filterProducts = (searchKey, sortKey, category) => (dispatch) => {
  let productsList = [];

  dispatch({ type: "GET_PRODUCTS_REQUEST" });

  axios
    .get("/api/products/getallproducts")
    .then((res) => {
      if (searchKey === "") {
        productsList = res.data;
      } else {
        productsList = res.data.filter((it) =>
          it.name.toLowerCase().includes(searchKey.toLowerCase())
        );
      }

      if (category !== "all") {
        productsList = res.data.filter((it) => it.category === category);
      }

      switch (sortKey) {
        case "htl":
          productsList = productsList.sort((a, b) => b.price - a.price);
          break;
        case "lth":
          productsList = productsList.sort((a, b) => a.price - b.price);
          break;
        case "stars":
          productsList = productsList.sort((a, b) => b.rating - a.rating);
          break;
        default:
      }

      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: productsList });
    })
    .catch((err) => {
      dispatch({ type: "GET_PRODUCTS_FAILED", payload: err });
    });
};

export const addProductReview = (review, productId) => (dispatch, getState) => {
  dispatch({ type: "ADD_PRODUCT_REVIEW_REQUEST" });
  const currentUser = getState().loginUserReducer.currentUser;
  axios
    .post("/api/products/addreview", { review, productId, currentUser })
    .then((res) => {
      dispatch({ type: "ADD_PRODUCT_REVIEW_SUCCESS" });
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: "ADD_PRODUCT_REVIEW_FAILED" });
    });
};

export const deleteProduct = (id) => (dispatch) => {
  dispatch({ type: "DELETE_PRODUCT_REQUEST" });

  axios
    .post("/api/products/deleteproduct", { id: id })
    .then((res) => {
      dispatch({ type: "DELETE_PRODUCT_SUCCESS" });
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: "DELETE_PRODUCT_FAILED" });
    });
};

export const addProduct = (product) => (dispatch) => {
  dispatch({ type: "ADD_PRODUCT_REQUEST" });

  axios
    .post("/api/products/addproduct", { product })
    .then((res) => {
      dispatch({ type: "ADD_PRODUCT_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: "ADD_PRODUCT_FAILED" });
    });
};

export const updateProduct = (product, id) => (dispatch) => {
  dispatch({ type: "UPDATE_PRODUCT_REQUEST" });

  axios
  .post("/api/products/updateproduct", { product: product, id: id })
  .then((res) => {
    dispatch({ type: "UPDATE_PRODUCT_SUCCESS" });
  })
  .catch((err) => {
    dispatch({ type: "UPDATE_PRODUCT_FAILED" });
  });
  
}