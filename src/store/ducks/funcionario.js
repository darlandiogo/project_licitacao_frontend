export const types = {
    ASYNC_LOAD_FUNCIONARIO: "ASYNC_LOAD_FUNCIONARIO",
    LOAD_FUNCIONARIO: "LOAD_FUNCIONARIO",
    ASYNC_LOAD_FUNCIONARIO_ID: "ASYNC_LOAD_FUNCIONARIO_ID",
    ASYNC_CREATE_FUNCIONARIO: "ASYNC_CREATE_FUNCIONARIO", 
    ASYNC_UṔDATE_FUNCIONARIO: "ASYNC_UṔDATE_FUNCIONARIO", 
    FUNCIONARIO_ERROR:  "FUNCIONARIO_ERROR",
    FUNCIONARIO_LOADING: "FUNCIONARIO_LOADING",
    LOAD_LIST_PESSOA: "LOAD_LIST_PESSOA",
    ASYNC_LOAD_LIST_PESSOA: "ASYNC_LOAD_LIST_PESSOA",
    ASYNC_SEARCH_FUNCIONARIO: "ASYNC_SEARCH_FUNCIONARIO"
   // ASYNC_UPDATE_FUNCIONARIO_ADDRESS: "ASYNC_UPDATE_FUNCIONARIO_ADDRESS", 
   // ASYNC_UPDATE_FUNCIONARIO_PHONE: "ASYNC_UPDATE_FUNCIONARIO_PHONE",
};

const INITIAL_STATE = {
    loaded: false,
    errors: null,
    data: null,
    listPessoa: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOAD_FUNCIONARIO:
            return { ...state, loaded: true, data: action.payload };
        case types.FUNCIONARIO_ERROR:
            return { ...state, errors: action.payload };
        case types.FUNCIONARIO_LOADING:
            return { ...state, loaded: false };
        case types.LOAD_LIST_PESSOA:
            return { ...state, listPessoa: action.payload};
        default:
            return { ...state };
    }
};

export const loadFuncionario = ( page, perPage ) => ({ type: types.ASYNC_LOAD_FUNCIONARIO, payload: {page, perPage} })
export const loadFuncionarioById = ( id ) => ({ type: types.ASYNC_LOAD_FUNCIONARIO_ID, payload: id})
export const createFuncionario  = (values) => ({ type: types.ASYNC_CREATE_FUNCIONARIO , payload: values})
export const updateFuncionario  = (id, values) => ({ type: types.ASYNC_UṔDATE_FUNCIONARIO , payload: {id, values}})
export const searchFuncionario = (searchTerm) => ({ type:types.ASYNC_SEARCH_FUNCIONARIO, payload: {searchTerm} })
export const loadListPessoa = () => ({ type: types.ASYNC_LOAD_LIST_PESSOA})
//export const updateAddress = (values) => ({ type: types.ASYNC_UPDATE_FUNCIONARIO_ADDRESS, payload: values})
//export const updatePhone = (values) => ({ type: types.ASYNC_UPDATE_FUNCIONARIO_PHONE, payload: values})
export const resetError  = () => ({ type: types.FUNCIONARIO_ERROR })

