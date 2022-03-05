import tasks from 'data/tasks';
import { filterByTab, filterTasks } from 'redux/utils';

const initialState = {
  allTasks: tasks,
  tasks,
  tab: 'all',
  anywhere: false,
  anytime: false,
  category: null,
  groupBy: '',
  byReward: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TAB': {
      return {
        ...state,
        tasks: filterByTab(state.allTasks, action.payload),
        tab: action.payload,
      };
    }
    case 'SET_ANYWHERE': {
      if (action.payload) {
        const filtered = state.allTasks.filter((task) => !task.location);
        filtered.sort((a, b) => {
          if (a.category === 'START-HERE' || b.category === 'START-HERE') {
            return -1;
          } else {
            return 1;
          }
        });
        return { ...state, tasks: filtered, anywhere: action.payload };
      } else {
        return {
          ...state,
          // tasks: filterByTab(state.allTasks, action.payload),
          anywhere: action.payload,
        };
      }
    }
    // case 'SET_ANYTIME': {
    //   if (action.payload) {
    //     const filtered = state.allTasks.filter(
    //       (task) => !task.appointmentDateTime
    //     );
    //     filtered.sort((a, b) => {
    //       if (a.category === 'START-HERE' || b.category === 'START-HERE') {
    //         return -1;
    //       } else {
    //         return 1;
    //       }
    //     });
    //     return { ...state, tasks: filtered, anytime: action.payload };
    //   } else {
    //     return {
    //       ...state,
    //       tasks: filterByTab(state.allTasks, action.payload),
    //       anytime: action.payload,
    //     };
    //   }
    // }
    case 'SET_CATEGORY': {
      return { ...state, category: action.payload };
    }
    case 'SET_GROUP_BY': {
      return { ...state, groupBy: action.payload };
    }
    // case 'APPLY_FILTERS': {
    //   return {
    //     ...state,
    //     tasks: filterTasks(state.tasks, {
    //       category: state.category,
    //       groupBy: state.groupBy,
    //     }),
    //   };
    // }
    default: {
      return state;
    }
  }
};

export default reducer;
