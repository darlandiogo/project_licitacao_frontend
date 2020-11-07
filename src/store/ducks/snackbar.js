export const types = {
    SET_SNACKBAR: "SET_SNACKBAR",
    SHOW_SNACKBAR: "SHOW_SNACKBAR",
};

const INITIAL_STATE = {
    type: 'success', 
    message: null,
    show:false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SHOW_SNACKBAR:
            return { ...state, show: action.payload };
        case types.SET_SNACKBAR:
            return { ...state, type: action.payload.type, message: action.payload.message };
        default:
            return { ...state };
    }
};

export const closeSnackbar = (value) => ({ type: types.SHOW_SNACKBAR, payload: value});