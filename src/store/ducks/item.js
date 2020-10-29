export const types = {
    ASYNC_LOAD_ITEM_LICITACAO: "ASYNC_LOAD_ITEM_LICITACAO",
    ASYNC_SEARCH_ITEM_LICITACAO: "ASYNC_SEARCH_ITEM_LICITACAO",
    LOAD_ITEM: "LOAD_ITEM",
    ASYNC_LOAD_ITEM_ID: "ASYNC_LOAD_ITEM_ID",
    ASYNC_CREATE_ITEM: "ASYNC_CREATE_ITEM", 
    ASYNC_UPDATE_ITEM: "ASYNC_UPDATE_ITEM", 
    ITEM_ERROR:  "ITEM_ERROR",
    ITEM_LOADING: "ITEM_LOADING",
};

const INITIAL_STATE = {
    loaded: false,
    errors: null,
    data: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOAD_ITEM:
            return { ...state, loaded: true, data: action.payload };
        case types.ITEM_ERROR:
            return { ...state, errors: action.payload };
        case types.ITEM_LOADING:
            return { ...state, loaded: false };
        default:
            return { ...state };
    }
};

export const searchItemLicitacao = (searchTerm) => ({ type:types.ASYNC_SEARCH_ITEM_LICITACAO, payload: {searchTerm} })
export const loadItemLicitacao = (page, perPage) => ({ type: types.ASYNC_LOAD_ITEM_LICITACAO, payload: {page, perPage} })
export const loadItemById = ( id ) => ({ type: types.ASYNC_LOAD_ITEM_ID, payload: id})
export const createItem  = (values) => ({ type: types.ASYNC_CREATE_ITEM , payload: values})
export const updateItem  = (id, values) => ({ type: types.ASYNC_UPDATE_ITEM , payload: {id, values}})
export const resetError  = () => ({ type: types.ITEM_ERROR })

