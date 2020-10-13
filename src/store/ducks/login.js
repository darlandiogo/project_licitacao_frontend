export const types = {
    ASYNC_LOGIN: "ASYNC_LOGIN",
    LOGIN: "LOGIN",
    LOGIN_RESET: "LOGIN_RESET",
    LOGOUT: "LOGOUT",
    LOGIN_ERROR:  "LOGIN_ERROR",
    ASYNC_LOGOUT: "ASYNC_LOGOUT",
    LOGIN_LOADING: "LOGIN_LOADING"
};

const INITIAL_STATE = {
    loaded: true,
    errors: null,
    data: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOGIN:
            return { ...state, loaded: true, data: action.payload };
        case types.LOGOUT:
            return { ...state, data: null };
        case types.LOGIN_ERROR:
            return { ...state, errors: action.payload };
        case types.LOGIN_LOADING:
            return { ...state, loaded: false };
        case types.LOGIN_RESET:
            return { ...state, ...INITIAL_STATE };
        default:
            return { ...state };
    }
};

export const loginUser = (values) => ({ type: types.ASYNC_LOGIN, payload: values });
export const logoutUser = () => ({ type: types.ASYNC_LOGOUT });
export const resetError = () => ({ type: types.LOGIN_RESET });

