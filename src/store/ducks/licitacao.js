export const types = {
    ASYNC_LOAD_LICITACAO: "ASYNC_LOAD_LICITACAO",
    LOAD_LICITACAO: "LOAD_LICITACAO",
    ASYNC_LOAD_LICITACAO_ID: "ASYNC_LOAD_LICITACAO_ID",
    ASYNC_CREATE_LICITACAO: "ASYNC_CREATE_LICITACAO", 
    ASYNC_UPDATE_LICITACAO: "ASYNC_UPDATE_LICITACAO", 
    LICITACAO_ERROR:  "LICITACAO_ERROR",
    LICITACAO_LOADING: "LICITACAO_LOADING",
    ASYNC_SEARCH_LICITACAO: "ASYNC_SEARCH_LICITACAO",
    LOAD_SELECTOPTIONS: "LOAD_SELECTOPTIONS",
    ASYNC_LOAD_SELECTOPTIONS: "ASYNC_LOAD_SELECTOPTIONS",
};

const INITIAL_STATE = {
    loaded: false,
    errors: null,
    data: null,
    selectOptions: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOAD_LICITACAO:
            return { ...state, loaded: true, data: action.payload };
        case types.LOAD_SELECTOPTIONS:
            return { ...state, selectOptions: action.payload };
        case types.LICITACAO_ERROR:
            return { ...state, errors: action.payload };
        case types.LICITACAO_LOADING:
            return { ...state, loaded: false };
        default:
            return { ...state };
    }
};

export const loadLicitacao = ( page, perPage ) => ({ type: types.ASYNC_LOAD_LICITACAO, payload: {page, perPage} })
export const loadLicitacaoById = ( id ) => ({ type: types.ASYNC_LOAD_LICITACAO_ID, payload: id})
export const createLicitacao  = (values) => ({ type: types.ASYNC_CREATE_LICITACAO , payload: values})
export const updateLicitacao  = (id, values) => ({ type: types.ASYNC_UPDATE_LICITACAO , payload: {id, values}})
export const searchLicitacao = (searchTerm) => ({ type:types.ASYNC_SEARCH_LICITACAO, payload: {searchTerm} })
export const selectOptions = () => ({type: types.ASYNC_LOAD_SELECTOPTIONS})
export const resetError  = () => ({ type: types.LICITACAO_ERROR })

