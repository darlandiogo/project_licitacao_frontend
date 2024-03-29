export const types = {
    ASYNC_LOAD_ITEM: "ASYNC_LOAD_ITEM",
    ASYNC_SEARCH_ITEM: "ASYNC_SEARCH_ITEM",
    LOAD_ITEM: "LOAD_ITEM",
    RESET_ITEM_ID:  "RESET_ITEM_ID",
    LOAD_ITEM_ID: "LOAD_ITEM_ID",
    ASYNC_LOAD_ITEM_ID: "ASYNC_LOAD_ITEM_ID",
    ASYNC_CREATE_ITEM: "ASYNC_CREATE_ITEM", 
    ASYNC_UPDATE_ITEM: "ASYNC_UPDATE_ITEM", 
    ASYNC_DELETE_ITEM: "ASYNC_DELETE_ITEM", 
    ASYNC_DELETE_ITEM_ALL: "ASYNC_DELETE_ITEM_ALL", 
    ASYNC_EXPORT_ITEM: "ASYNC_EXPORT_ITEM",
    ASYNC_IMPORT_ITEM: "ASYNC_IMPORT_ITEM",
    ITEM_ERROR:  "ITEM_ERROR",
    ITEM_LOADING: "ITEM_LOADING",
};

const INITIAL_STATE = {
    loaded: false,
    errors: null,
    data: null,
    elem: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOAD_ITEM:
            return { ...state, loaded: true, data: action.payload };
        case types.LOAD_ITEM_ID:
            return { ...state, loaded: true, elem: action.payload };
        case types.RESET_ITEM_ID:
            return { ...state, elem: null };
        case types.ITEM_ERROR:
            return { ...state, errors: action.payload };
        case types.ITEM_LOADING:
            return { ...state, loaded: false };
        default:
            return { ...state };
    }
};

export const searchItemLicitacao = (searchTerm) => ({ type:types.ASYNC_SEARCH_ITEM, payload: {searchTerm, type: 'licitacao'} })
export const loadItemLicitacao = (page, perPage) => ({ type: types.ASYNC_LOAD_ITEM, payload: {page, perPage, type: 'licitacao'} })
export const searchItemCotacao = (searchTerm) => ({ type:types.ASYNC_SEARCH_ITEM, payload: {searchTerm, type: 'cotacao'} })
export const loadItemCotacao  = (page, perPage) => ({ type: types.ASYNC_LOAD_ITEM, payload: {page, perPage, type: 'cotacao'} })
export const loadItemById  = ( id ) => ({ type: types.ASYNC_LOAD_ITEM_ID, payload: id})
export const createItem    = (values) => ({ type: types.ASYNC_CREATE_ITEM , payload: values})
export const updateItem    = (id, values) => ({ type: types.ASYNC_UPDATE_ITEM , payload: {id, values}})
export const deleteItem    = ( values ) => ({ type: types.ASYNC_DELETE_ITEM, payload: values})
export const deleteItemAll =  (values) => ({type: types.ASYNC_DELETE_ITEM_ALL, payload: values})
export const exportItem    = (values) => ({type: types.ASYNC_EXPORT_ITEM, payload: values});
export const importItem    = (values) => ({type: types.ASYNC_IMPORT_ITEM, payload: values});
export const resetItem     = () => ({ type: types.RESET_ITEM_ID })
export const resetError    = () => ({ type: types.ITEM_ERROR })

