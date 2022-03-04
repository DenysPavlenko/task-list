import React from 'react';

const initialState = {
  category: null,
  groupBy: '',
  byReward: '',
};

const FiltersContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORY': {
      return { ...state, category: action.payload };
    }
    case 'SET_GROUP_BY': {
      return { ...state, groupBy: action.payload };
    }
    case 'SET_BY_REWARD': {
      return { ...state, byReward: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const FiltersProvider = ({ children }) => {
  const [filters, dispatch] = React.useReducer(reducer, initialState);
  const store = React.useMemo(
    () => ({ filters, dispatch }),
    [filters, dispatch]
  );

  return (
    <FiltersContext.Provider value={store}>{children}</FiltersContext.Provider>
  );
};

const useFiltersState = () => {
  const context = React.useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('useFiltersState must be used within a FiltersContext');
  }
  return context;
};

export { FiltersProvider, useFiltersState };
