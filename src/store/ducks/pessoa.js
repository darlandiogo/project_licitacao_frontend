export const types = {
    ASYNC_LOAD_PESSOA: "ASYNC_LOAD_PESSOA",
    LOAD_PESSOA: "LOAD_PESSOA",
    ASYNC_LOAD_PESSOA_ID: "ASYNC_LOAD_PESSOA_ID",
    LOAD_PESSOA_ID: "LOAD_PESSOA_ID",
    PESSOA_ERROR:  "PESSOA_ERROR",
    PESSOA_LOADING: "PESSOA_LOADING"
};

const INITIAL_STATE = {
    loaded: false,
    errors: null,
    data: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOAD_PESSOA:
            return { ...state, loaded: true, data: action.payload };
        case types.PESSOA_ERROR:
            return { ...state, errors: action.payload };
        case types.PESSOA_LOADING:
            return { ...state, loaded: false };
        default:
            return { ...state };
    }
};

export const loadPessoa = ( page, perPage ) => ({ type: types.ASYNC_LOAD_PESSOA, payload: {page, perPage} });
export const loadPessoaById = ( id ) => ({ type: types.ASYNC_LOAD_PESSOA_ID, payload: id})
export const resetError = () => ({ type: types.PESSOA_ERROR });

