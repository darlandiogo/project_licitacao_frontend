// Types
export const types = {
    UPDATE_TABLE_STATUS: 'UPDATE_TABLE_STATUS',
    UPDATE_TABLE_PAGINATION: 'UPDATE_TABLE_PAGINATION',
    RESET_TABLE_STATE: 'RESET_TABLE_STATE'
  };
  
  // Reducer
  const INITIAL_VALUES = {
    currentPage: 0,
    perPage: 0,
    totalRows: 0,
    lastPage: 0
  };
  
  export default (state = INITIAL_VALUES, action) => {
    switch (action.type) {
      case types.UPDATE_TABLE_STATUS:
        return { ...state, loading: action.payload.loading };
      case types.UPDATE_TABLE_PAGINATION:
        return { ...INITIAL_VALUES, ...action.payload };
      case types.RESET_TABLE_STATE:
        return { ...INITIAL_VALUES };
      case "RESET":
        return { ...state, ...INITIAL_VALUES };
      default:
        return state;
    }
  };
  
  // Action Creators
  export const updateTablePagination = () => ({
    type: types.UPDATE_TABLE_PAGINATION
  });
  
  export const resetTableState = () => ({
    type: types.RESET_TABLE_STATE
  });
  