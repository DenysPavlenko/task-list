import PropTypes from 'prop-types';
import css from './Checkbox.module.scss';

const Checkbox = ({ checked, onChange, name, label }) => {
  return (
    <label className={css.checkbox}>
      <input
        name={name}
        className={css.input}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className={css.label}>{label}</span>
    </label>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
};

export default Checkbox;
