import PropTypes from 'prop-types';
import css from './Radio.module.scss';

const Radio = ({
  checked,
  onChange = () => {},
  onClick = () => {},
  name,
  value,
  label,
}) => {
  return (
    <label className={css.radio}>
      <input
        checked={checked}
        value={value}
        name={name}
        className={css.input}
        type="radio"
        onClick={onClick}
        onChange={onChange}
      />
      <span className={css.label}>{label}</span>
    </label>
  );
};

Radio.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
};

export default Radio;
