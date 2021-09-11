import axios from "axios";

export const registerUser = (user) => (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });

  axios
    .post("/api/users/register", user)
    .then((res) => {
      dispatch({ type: "USER_REGISTER_SUCCESS" });
      window.location.href = "/login";
    })
    .catch((err) => {
      dispatch({
        type: "USER_REGISTER_FAILED",
        payload: err.response.data.message,
      });
    });
};

export const loginUser = (user) => (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });

  axios
    .post("/api/users/login", user)
    .then((res) => {
      dispatch({ type: "USER_LOGIN_SUCCESS" });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      window.location.href = "/";
    })
    .catch((err) => {
      dispatch({
        type: "USER_LOGIN_FAILED",
        payload: err.response.data.message,
      });
    });
};

export const setPremiumUser = (user) => (dispatch) => {
  console.log(user);
  dispatch({ type: "USER_PREMIUM_REQUEST" });
  axios
    .post("/api/users/premium", { id: user._id })
    .then((res) => {
      dispatch({ type: "USER_PREMIUM_SUCCESS" });
      console.log(res);
      user.isPremium = true;
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "USER_PREMIUM_FAILED" });
    });
};

export const getAllUsers = () => (dispatch) => {
  dispatch({ type: "GET_ALLUSERS_REQUEST" });

  axios
    .get("/api/users/getallusers")
    .then((res) => {
      dispatch({ type: "GET_ALLUSERS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_ALLUSERS_FAILED" });
    });
};

export const deleteUser = (id) => (dispatch) => {
  dispatch({ type: "DELETE_USER_REQUEST" });

  axios
    .post("/api/users/deleteuser", {id: id})
    .then((res) => {
      dispatch({ type: "DELETE_USER_SUCCESS" });
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: "DELETE_USER_FAILED" });
    });
};
