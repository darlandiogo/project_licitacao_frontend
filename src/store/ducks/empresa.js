export const types = {
    ASYNC_LOAD_EMPRESA: "ASYNC_LOAD_EMPRESA",
    LOAD_EMPRESA: "LOAD_EMPRESA",
    ASYNC_LOAD_SECRETARIA: "ASYNC_LOAD_SECRETARIA",
    ASYNC_LOAD_EMPRESA_ID: "ASYNC_LOAD_EMPRESA_ID",
    ASYNC_CREATE_EMPRESA: "ASYNC_CREATE_EMPRESA", 
    ASYNC_UPDATE_EMPRESA: "ASYNC_UPDATE_EMPRESA", 
    EMPRESA_ERROR:  "EMPRESA_ERROR",
    EMPRESA_LOADING: "EMPRESA_LOADING",
    ASYNC_UPDATE_EMPRESA_ADDRESS: "ASYNC_UPDATE_EMPRESA_ADDRESS", 
    ASYNC_UPDATE_EMPRESA_PHONE: "ASYNC_UPDATE_EMPRESA_PHONE",
    ASYNC_UPDATE_EMPRESA_REPRESENTANTE: "ASYNC_UPDATE_EMPRESA_REPRESENTANTE",
    ASYNC_SEARCH_SECRETARIA: "ASYNC_SEARCH_SECRETARIA",
    ASYNC_SEARCH_EMPRESA: "ASYNC_SEARCH_EMPRESA"
};

const INITIAL_STATE = {
    loaded: false,
    errors: null,
    data: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOAD_EMPRESA:
            return { ...state, loaded: true, data: action.payload };
        case types.EMPRESA_ERROR:
            return { ...state, errors: action.payload };
        case types.EMPRESA_LOADING:
            return { ...state, loaded: false };
        default:
            return { ...state };
    }
};

export const loadEmpresa = ( page, perPage ) => ({ type: types.ASYNC_LOAD_EMPRESA, payload: {page, perPage} })
export const loadSecretaria = ( page, perPage ) => ({ type: types.ASYNC_LOAD_SECRETARIA, payload: {page, perPage} })
export const loadEmpresaById = ( id ) => ({ type: types.ASYNC_LOAD_EMPRESA_ID, payload: id})
export const createEmpresa  = (values) => ({ type: types.ASYNC_CREATE_EMPRESA , payload: values})
export const updateEmpresa  = (id, values) => ({ type: types.ASYNC_UPDATE_EMPRESA , payload: {id, values}})
export const searchSecretaria = (searchTerm) => ({ type:types.ASYNC_SEARCH_SECRETARIA, payload: {searchTerm} })
export const searchEmpresa = (searchTerm) => ({ type:types.ASYNC_SEARCH_EMPRESA, payload: {searchTerm} })
export const updateAddress = (values) => ({ type: types.ASYNC_UPDATE_EMPRESA_ADDRESS, payload: values})
export const updateRepresentante = (values) => ({ type: types.ASYNC_UPDATE_EMPRESA_REPRESENTANTE, payload: values})
export const updatePhone = (values) => ({ type: types.ASYNC_UPDATE_EMPRESA_PHONE, payload: values})
export const resetError  = () => ({ type: types.EMPRESA_ERROR })

