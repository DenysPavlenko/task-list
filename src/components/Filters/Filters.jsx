import { useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'components/Select';
import Button from 'components/Button';
import Radio from 'components/Radio';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import categories from 'data/categories';
import css from './Filters.module.scss';

const Filters = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [category, setCategory] = useState(categories[0]);
  const [groupBy, setGroupBy] = useState(state.groupBy);

  const handleGroupBy = (e) => {
    groupBy === e.target.value ? setGroupBy('') : setGroupBy(e.target.value);
  };

  const handleApply = () => {
    dispatch({ type: 'SET_CATEGORY', payload: category.value });
    dispatch({ type: 'SET_GROUP_BY', payload: groupBy });
    dispatch({ type: 'APPLY_FILTERS' });
    onClose();
  };

  return (
    <>
      <div className={clsx(css.overlay, show && css.show)} onClick={onClose} />
      <div className={clsx(css.filters, show && css.show)}>
        <div className={css.container}>
          <div className={css.header}>
            <h3 className={css.headerTitle}>Filters</h3>
            <CloseIcon className={css.headerClose} onClick={onClose} />
          </div>
          <div className={css.filter}>
            <h4 className={css.filterTitle}>Category:</h4>
            <Select
              value={category}
              onChange={setCategory}
              options={categories}
            />
          </div>
          <div className={css.filter}>
            <h4 className={css.filterTitle}>Filter by:</h4>
            <div className={css.filterBoxes}>
              <Radio
                name="groupBy"
                value="reward"
                label="Reward"
                onClick={handleGroupBy}
                checked={groupBy === 'reward'}
              />
              <Radio
                name="groupBy"
                value="paid"
                label="Only paid"
                onClick={handleGroupBy}
                checked={groupBy === 'paid'}
              />
              <Radio
                name="groupBy"
                value="xp"
                label="Only XP"
                onClick={handleGroupBy}
                checked={groupBy === 'xp'}
              />
            </div>
          </div>
          <div className={css.apply}>
            <Button variant="primary" onClick={handleApply}>
              Apply filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
