import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Filters from 'components/Filters';
import TaskItem from 'components/TaskItem';
import ButtonGroup from 'components/ButtonGroup';
import Button from 'components/Button';
import Pagination from 'components/Pagination';
import Checkbox from 'components/Checkbox';
import { setTab, setAnywhere, setAnytime } from 'redux/actions/tasks';
import { tasksPagination } from './utils';
import categories from 'data/categories';
import css from './TaskList.module.scss';

const tabs = [
  { label: 'All tasks', value: 'all' },
  { label: 'Located tasks', value: 'location' },
  { label: 'Appointment time', value: 'time' },
];

const TaskList = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { tasks, tab, anywhere, anytime } = state;

  const toggleFilters = () => setShowFilters((show) => !show);

  const handleTabChange = (tab) => {
    dispatch(setTab(tab));
    dispatch(setAnywhere(false));
    dispatch(setAnytime(false));
  };

  useEffect(() => {
    page !== 1 && setPage(1);
  }, [state, tab, anytime, anywhere]);

  // const ft = useMemo(() => {
  //   return filterTasks(tasks, state);
  // }, [state, tasks]);

  const splitTasks = useMemo(() => {
    return tasksPagination(page, tasks);
  }, [page, tasks]);

  return (
    <>
      <Filters show={showFilters} onClose={toggleFilters} />
      <div className={css.list}>
        <div className={css.buttons}>
          <Button onClick={toggleFilters} variant="primary">
            Filters
          </Button>
          <ButtonGroup>
            {tabs.map(({ label, value }) => (
              <Button
                key={value}
                variant="primary"
                active={value === tab}
                onClick={() => handleTabChange(value)}
              >
                {label}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <div className={css.checkboxes}>
          {tab === 'location' && (
            <Checkbox
              value="location"
              label="Anywhere tasks"
              checked={anywhere}
              onChange={(e) => dispatch(setAnywhere(e.target.checked))}
            />
          )}
          {tab === 'time' && (
            <Checkbox
              value="location"
              label="Anytime tasks"
              checked={anytime}
              onChange={(e) => dispatch(setAnytime(e.target.checked))}
            />
          )}
        </div>
        {splitTasks.length > 0 && (
          <>
            <div className={css.scroll}>
              {splitTasks.map((task) => {
                const icon = categories.find(
                  (cat) => task.category === cat.value
                )?.icon;
                return (
                  <TaskItem
                    key={task.id}
                    icon={icon}
                    title={task.title}
                    cash={task.reward.cash}
                    xp={!task.reward.cash ? task.reward.xp : null}
                    location={
                      tab === 'location' || tab === 'all'
                        ? task?.location?.address
                        : ''
                    }
                    time={
                      tab === 'time' || tab === 'all'
                        ? task?.location?.address
                        : ''
                    }
                  />
                );
              })}
            </div>
            <div className={css.pagination}>
              <Pagination
                page={page}
                pages={Math.ceil(tasks.length / 10)}
                setPage={setPage}
              />
            </div>
          </>
        )}
        {splitTasks.length === 0 && <h4>Nothing to display</h4>}
      </div>
    </>
  );
};

export default TaskList;
