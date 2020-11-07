export const types = {
    SET_DIALOG: "SET_DIALOG",
    SET_DIALOG_DELETE_ALL: "SET_DIALOG_DELETE_ALL"
};

const INITIAL_STATE = {

    data: false,
    deleteAll: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_DIALOG:
            return { ...state, data: action.payload };
        case types.SET_DIALOG_DELETE_ALL:
            return { ...state, deleteAll: action.payload };
        default:
            return { ...state };
    }
};

export const setDialog = (value) => ({ type: types.SET_DIALOG, payload: value});
export const setDialogDeleteAll = (value) => ({ type: types.SET_DIALOG_DELETE_ALL, payload: value});

