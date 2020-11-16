export const types = {
    ASYNC_LOAD_COTACAO: "ASYNC_LOAD_COTACAO",
    LOAD_COTACAO: "LOAD_COTACAO",
    LOAD_LIST_EMPRESA: "LOAD_LIST_EMPRESA",
    ASYNC_LOAD_LIST_EMPRESA: "ASYNC_LOAD_LIST_EMPRESA",
    ASYNC_LOAD_COTACAO_ID: "ASYNC_LOAD_COTACAO_ID",
    ASYNC_CREATE_COTACAO: "ASYNC_CREATE_COTACAO", 
    ASYNC_UPDATE_COTACAO: "ASYNC_UPDATE_COTACAO", 
    COTACAO_ERROR:  "COTACAO_ERROR",
    COTACAO_LOADING: "COTACAO_LOADING",
    ASYNC_SEARCH_COTACAO: "ASYNC_SEARCH_COTACAO",
    //COTACAOEMPRESA
    COTACAO_EMPRESA_LOADING: "COTACAO_EMPRESA_LOADING",
    LOAD_COTACAO_EMPRESA: "LOAD_COTACAO_EMPRESA",
    ASYNC_LOAD_COTACAO_EMPRESA: "ASYNC_LOAD_COTACAO_EMPRESA",
    ASYNC_CREATE_COTACAO_EMPRESA: "ASYNC_CREATE_COTACAO_EMPRESA", 
    ASYNC_UPDATE_COTACAO_EMPRESA: "ASYNC_UPDATE_COTACAO_EMPRESA",
};

const INITIAL_STATE = {
    loaded: false,
    errors: null,
    data: null,
    listEmpresa: null,
    cotacao_empresa: null,
    loaded_cotacao_empresa: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOAD_COTACAO:
            return { ...state, loaded: true, data: action.payload };
        case types.LOAD_COTACAO_EMPRESA:
            return { ...state, loaded_cotacao_empresa: true, cotacao_empresa: action.payload };
        case types.LOAD_LIST_EMPRESA:
            return { ...state, loaded: true, listEmpresa: action.payload };
        case types.COTACAO_ERROR:
            return { ...state, errors: action.payload };
        case types.COTACAO_LOADING:
            return { ...state, loaded: false };
        case types.COTACAO_EMPRESA_LOADING:
            return { ...state, loaded_cotacao_empresa: false };
        default:
            return { ...state };
    }
};

export const loadCotacao     = (page, perPage) => ({type: types.ASYNC_LOAD_COTACAO, payload: {page, perPage}})
export const loadCotacaoById = (id) => ({type: types.ASYNC_LOAD_COTACAO_ID, payload: id})
export const loadListEmpresa = () => ({type: types.ASYNC_LOAD_LIST_EMPRESA})
export const createCotacao   = (values) => ({type: types.ASYNC_CREATE_COTACAO , payload: values})
export const updateCotacao   = (id, values) => ({type: types.ASYNC_UPDATE_COTACAO , payload: {id, values}})
export const searchCotacao   = (searchTerm) => ({type: types.ASYNC_SEARCH_COTACAO, payload: {searchTerm}})
export const resetError      = () => ({type: types.COTACAO_ERROR})

export const loadCotacaoEmpresa     = (id) => ({type: types.ASYNC_LOAD_COTACAO_EMPRESA, payload: id})
export const createCotacaoEmpresa   = (values) => ({type: types.ASYNC_CREATE_COTACAO_EMPRESA , payload: values})
export const updateCotacaoEmpresa   = (id, values) => ({type: types.ASYNC_UPDATE_COTACAO_EMPRESA , payload: {id, values}})

