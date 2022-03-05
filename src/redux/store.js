import { createStore } from 'redux';
// Reducers
import tasks from './reducers/tasks';

const store = createStore(tasks);

export { store };
