import PropTypes from 'prop-types';
import css from './TaskItem.module.scss';

const TaskItem = ({ title, cash, xp, time, icon, location }) => {
  return (
    <div className={css.item}>
      <div className={css.header}>
        <img className={css.icon} src={icon} alt="icon" />
        <h5 className={css.title}>{title}</h5>
        <div className={css.details}>
          {cash && <p>Cash: {cash}</p>}
          {xp && <p>XP: {xp}</p>}
        </div>
      </div>
      <div className={css.info}>
        {location && <p>Location: {location}</p>}
        {time && <p>Time: {new Date(time).toLocaleString('nl-NL')}</p>}
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  title: PropTypes.string,
  cash: PropTypes.number,
  xp: PropTypes.number,
  time: PropTypes.string,
  icon: PropTypes.string,
  location: PropTypes.string,
};

export default TaskItem;
