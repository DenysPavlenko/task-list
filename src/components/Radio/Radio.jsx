import css from './Radio.module.scss';

const Radio = ({ checked, onChange, name, value, label }) => {
  return (
    <label className={css.radio}>
      <input
        checked={checked}
        value={value}
        name={name}
        className={css.input}
        type="radio"
        onChange={onChange}
      />
      <span className={css.label}>{label}</span>
    </label>
  );
};

export default Radio;
