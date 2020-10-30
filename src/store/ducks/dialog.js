export const types = {
    SET_DIALOG: "SET_DIALOG",
};

const INITIAL_STATE = {

    data: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_DIALOG:
            return { ...state, loaded: true, data: action.payload };
        default:
            return { ...state };
    }
};

export const setDialog = (value) => ({ type: types.SET_DIALOG, payload: value});

