export const types = {  
    ERROR: 'ERROR',
    ERROR_LOADING: "ERROR_LOADING",
    ERROR_RESET: "ERROR_RESET",
};

const INITIAL_STATE = {
    loaded: true,
    data: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.ERROR:
        return { ...state, loaded: true, data: action.payload };
        case types.ERROR_LOADING:
        return { ...state, loaded: false };
        case types.ERROR_RESET:
        return { ...state, ...INITIAL_STATE };
        default:
        return { ...state };
    }
};

export const resetError = () => ({ type: types.ERROR_RESET });