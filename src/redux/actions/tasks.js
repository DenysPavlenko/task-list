import { store } from 'redux/store';
import { filterByTab, filterGroupBy } from 'redux/utils';

export const setTab = (payload) => ({ type: 'SET_TAB', payload });
export const setAnywhere = (payload) => ({ type: 'SET_ANYWHERE', payload });
export const setAnytime = (payload) => ({ type: 'SET_ANYTIME', payload });

export const filterAllTasks = () => {
  const { allTasks, tab, anywhere, anytime, category, groupBy } =
    store.getState();

  let filtered = [...allTasks];
  filtered = filterByTab(filtered, tab);

  if (anywhere) {
    filtered = allTasks.filter((task) => !task.location);
    filtered = [...filtered].sort((a, b) => {
      if (a.category === 'START-HERE' || b.category === 'START-HERE') {
        return -1;
      } else {
        return 1;
      }
    });
  }

  if (anytime) {
    filtered = allTasks.filter((task) => !task.appointmentDateTime);
    filtered = [...filtered].sort((a, b) => {
      if (a.category === 'START-HERE' || b.category === 'START-HERE') {
        return -1;
      } else {
        return 1;
      }
    });
  }

  if (category) {
    filtered = filtered.filter((task) => {
      return !category || category === 'ALL'
        ? true
        : task.category === category;
    });
  }

  if (groupBy) {
    filtered = filterGroupBy(filtered, groupBy);
  }

  return {
    type: 'SET_FILTERED_TASKS',
    payload: filtered,
  };
};
