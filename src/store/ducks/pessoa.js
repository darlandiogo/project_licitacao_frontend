export const types = {
    ASYNC_LOAD_PESSOA: "ASYNC_LOAD_PESSOA",
    LOAD_PESSOA: "LOAD_PESSOA",
    ASYNC_LOAD_PESSOA_ID: "ASYNC_LOAD_PESSOA_ID",
    //LOAD_PESSOA_ID: "LOAD_PESSOA_ID",
    ASYNC_CREATE_PESSOA: "ASYNC_CREATE_PESSOA", 
    ASYNC_UPDATE_PESSOA: "ASYNC_UPDATE_PESSOA", 
    PESSOA_ERROR:  "PESSOA_ERROR",
    PESSOA_LOADING: "PESSOA_LOADING",
    ASYNC_UPDATE_PESSOA_ADDRESS: "ASYNC_UPDATE_PESSOA_ADDRESS", 
    ASYNC_UPDATE_PESSOA_PHONE: "ASYNC_UPDATE_PESSOA_PHONE",
    ASYNC_SEARCH_PESSOA: "ASYNC_SEARCH_PESSOA"
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

export const loadPessoa = ( page, perPage ) => ({ type: types.ASYNC_LOAD_PESSOA, payload: {page, perPage} })
export const loadPessoaById = ( id ) => ({ type: types.ASYNC_LOAD_PESSOA_ID, payload: id})
export const createPessoa  = (values) => ({ type: types.ASYNC_CREATE_PESSOA , payload: values})
export const updatePessoa  = (id, values) => ({ type: types.ASYNC_UPDATE_PESSOA , payload: {id, values}})
export const updateAddress = (values) => ({ type: types.ASYNC_UPDATE_PESSOA_ADDRESS, payload: values})
export const updatePhone = (values) => ({ type: types.ASYNC_UPDATE_PESSOA_PHONE, payload: values})
export const searchPessoa = (searchTerm) => ({ type:types.ASYNC_SEARCH_PESSOA, payload: {searchTerm} })
export const resetError  = () => ({ type: types.PESSOA_ERROR })

