import { get } from 'lodash';

export const withSearchPagination = ({
  predicateAfterFetch,
  predicateSetPagination,
}) => {
  const byFilterReducer = (state = {}, action) => {
    if (predicateAfterFetch(action)) {
      return {
        ...state,
        [action.payload.keyFilter]: action.payload.result,
      };
    }

    return state;
  };

  const paginationReducer = (state = {}, action) => {
    if (predicateAfterFetch(action)) {
      return {
        ...state,
        ...action.payload.meta,
        forceReload: false,
      };
    }

    if (predicateSetPagination(action)) {
      return {
        ...state,
        ...action.payload.pagination,
      };
    }

    return state;
  };

  return reducer => (state, action) => {
    const newState = {
      ...state,
      byFilter: byFilterReducer(get(state, 'byFilter'), action),
      pagination: paginationReducer(get(state, 'pagination'), action),
    };

    return reducer(newState, action);
  };
};
