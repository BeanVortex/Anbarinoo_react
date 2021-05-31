import * as actionTypes from "../actions/actionTypes";

const initState = {
  userId: null,
  username: "",
  email: "",
  profile: "",
  accessToken: "",
  refreshToken: "",
  authenticated: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH:
      return {
        userId: action.payload.userId,
        username: action.payload.username,
        email: action.payload.email,
        profile: action.payload.profile,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        authenticated: true,
      };
    case actionTypes.RESET_USER:
      return initState;
    case actionTypes.AUTHED:
      return {
        userId: action.payload.userId,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        authenticated: true,
      };
    case actionTypes.NOT_AUTHED:
      return {
        ...initState,
      };
    default:
      return state;
  }
};

export default reducer;