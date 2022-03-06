import tasks from 'data/tasks';

const initialState = {
  allTasks: tasks,
  tasks,
  tab: 'all',
  anywhere: false,
  anytime: false,
  category: null,
  groupBy: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTERED_TASKS': {
      return {
        ...state,
        tasks: action.payload,
      };
    }
    case 'SET_TAB': {
      return {
        ...state,
        tab: action.payload,
      };
    }
    case 'SET_ANYWHERE': {
      return {
        ...state,
        anywhere: action.payload,
      };
    }
    case 'SET_ANYTIME': {
      return {
        ...state,
        anytime: action.payload,
      };
    }
    case 'SET_CATEGORY': {
      return { ...state, category: action.payload };
    }
    case 'SET_GROUP_BY': {
      return { ...state, groupBy: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
