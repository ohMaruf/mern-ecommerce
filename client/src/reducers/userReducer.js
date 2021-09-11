export function registerUserReducer(state = {}, action) {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "USER_REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };

    case "USER_REGISTER_FAILED":
      return {
        ...state,
        loading: false,
        err: action.payload,
      };

    default:
      return state;
  }
}

export function loginUserReducer(state = {}, action) {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
      };

    case "USER_LOGIN_FAILED":
      return {
        ...state,
        loading: false,
        err: action.payload,
      };

    default:
      return state;
  }
}

export function setPremiumUserReducer(state = {}, action) {
  switch (action.type) {
    case "USER_PREMIUM_REQUEST":
      return {
        loading: true,
      };

    case "USER_PREMIUM_SUCCESS":
      return {
        loading: false,
        success: true,
      };

    case "USER_PREMIUM_FAILED":
      return {
        loading: false,
        err: true,
      };

    default:
      return state;
  }
}

export function getAllUsersReducer(state = { users: [] }, action) {
  switch (action.type) {
    case "GET_ALLUSERS_REQUEST":
      return {
        loading: true,
      };
    case "GET_ALLUSERS_SUCCESS":
      return {
        loading: false,
        users: action.payload,
      };
    case "GET_ALLUSERS_FAILED":
      return {
        loading: false,
        err: true,
      };
    default:
      return state;
  }
}

export function deleteUserReducer(state = {}, action) {
  switch (action.type) {
    case "DELETE_USER_REQUEST":
      return {
        loading: true
      };
    case "DELETE_USER_SUCCESS":
      return {
        loading: false,
        success: true
      };
    case "DELETE_USER_FAILED":
      return {
        loading: false,
        err: false
      }
    default:
      return state;
  }
}
