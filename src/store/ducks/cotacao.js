export const types = {
    ASYNC_LOAD_COTACAO: "ASYNC_LOAD_COTACAO",
    LOAD_COTACAO: "LOAD_COTACAO",
    ASYNC_LOAD_COTACAO_ID: "ASYNC_LOAD_COTACAO_ID",
    ASYNC_CREATE_COTACAO: "ASYNC_CREATE_COTACAO", 
    ASYNC_UPDATE_COTACAO: "ASYNC_UPDATE_COTACAO", 
    COTACAO_ERROR:  "COTACAO_ERROR",
    COTACAO_LOADING: "COTACAO_LOADING",
    ASYNC_SEARCH_COTACAO: "ASYNC_SEARCH_COTACAO"

};

const INITIAL_STATE = {
    loaded: false,
    errors: null,
    data: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOAD_COTACAO:
            return { ...state, loaded: true, data: action.payload };
        case types.COTACAO_ERROR:
            return { ...state, errors: action.payload };
        case types.COTACAO_LOADING:
            return { ...state, loaded: false };
        default:
            return { ...state };
    }
};

export const loadCotacao = ( page, perPage ) => ({ type: types.ASYNC_LOAD_COTACAO, payload: {page, perPage} })
export const loadCotacaoById = ( id ) => ({ type: types.ASYNC_LOAD_COTACAO_ID, payload: id})
export const createCotacao  = (values) => ({ type: types.ASYNC_CREATE_COTACAO , payload: values})
export const updateCotacao  = (id, values) => ({ type: types.ASYNC_UPDATE_COTACAO , payload: {id, values}})
export const searchCotacao = (searchTerm) => ({ type:types.ASYNC_SEARCH_COTACAO, payload: {searchTerm} })
export const resetError  = () => ({ type: types.COTACAO_ERROR })

