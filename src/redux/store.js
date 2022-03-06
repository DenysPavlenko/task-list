import { createStore } from 'redux';
import tasks from './reducers/tasks';

const store = createStore(tasks);

export { store };
