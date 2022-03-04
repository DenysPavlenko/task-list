import { useEffect, useMemo, useState } from 'react';
import Filters from 'components/Filters';
import TaskItem from 'components/TaskItem';
import ButtonGroup from 'components/ButtonGroup';
import Button from 'components/Button';
import Pagination from 'components/Pagination';
import Checkbox from 'components/Checkbox';
import tasks from 'data/tasks';
import { filterByTab, filterTasks, tasksPagination } from './utils';
import { useFiltersState } from 'context/FiltersContext';
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
  const [tab, setTab] = useState(tabs[0].value);
  const [anywhere, setAnywhere] = useState(false);
  const [anytime, setAnytime] = useState(false);
  const { filters } = useFiltersState();

  const toggleFilters = () => setShowFilters((show) => !show);

  const handleTabChange = (tab) => {
    setAnywhere(false);
    setAnytime(false);
    setTab(tab);
  };

  useEffect(() => {
    page !== 1 && setPage(1);
  }, [filters, tab, anytime, anywhere]);

  const tasksByTab = useMemo(() => {
    if (anywhere) {
      const filtered = tasks.filter((task) => !task.location);
      return filtered.sort((a, b) => {
        if (a.category === 'START-HERE' || b === 'START-HERE') {
          return -1;
        } else {
          return 1;
        }
      });
    } else if (anytime) {
      const filtered = tasks.filter((task) => !task.appointmentDateTime);
      return filtered.sort((a, b) => {
        if (a.category === 'START-HERE' || b === 'START-HERE') {
          return -1;
        } else {
          return 1;
        }
      });
    } else {
      return filterByTab(tasks, tab);
    }
  }, [tab, anywhere, anytime]);

  const filteredTasks = useMemo(() => {
    return filterTasks(tasksByTab, filters);
  }, [filters, tasksByTab]);

  const splitTasks = useMemo(() => {
    return tasksPagination(page, filteredTasks);
  }, [page, filteredTasks, tasksByTab]);

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
        {splitTasks.length > 0 && (
          <>
            <div className={css.checkboxes}>
              {tab === 'location' && (
                <Checkbox
                  value="location"
                  label="Anywhere tasks"
                  checked={anywhere}
                  onChange={(e) => setAnywhere(e.target.checked)}
                />
              )}
              {tab === 'time' && (
                <Checkbox
                  value="location"
                  label="Anytime tasks"
                  checked={anytime}
                  onChange={(e) => setAnytime(e.target.checked)}
                />
              )}
            </div>
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
                    xp={!task.reward.cash && task.reward.xp}
                    location={
                      (tab === 'location' || tab === 'all') &&
                      task.location.address
                    }
                    time={
                      (tab === 'time' || tab === 'all') && task.location.address
                    }
                  />
                );
              })}
            </div>
            <div className={css.pagination}>
              <Pagination
                page={page}
                pages={Math.ceil(filteredTasks.length / 10)}
                setPage={setPage}
              />
            </div>
          </>
        )}
        {splitTasks.length === 0 && (
          <div>
            <h4>Nothing to display</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskList;
