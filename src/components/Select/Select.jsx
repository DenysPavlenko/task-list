import ReactSelect, { components } from 'react-select';
const { Option, SingleValue } = components;
import css from './Select.module.scss';

const CustomOption = (props) => (
  <Option {...props}>
    <div className={css.item}>
      {props.data.icon && <img src={props.data.icon} alt={props.data.label} />}
      {props.data.label}
    </div>
  </Option>
);

const CustomValue = (props) => (
  <SingleValue {...props}>
    <div className={css.item}>
      {props.data.icon && <img src={props.data.icon} alt={props.data.label} />}
      {props.data.label}
    </div>
  </SingleValue>
);

const Select = ({ value, options, onChange }) => {
  return (
    <ReactSelect
      value={value}
      onChange={onChange}
      options={options}
      components={{ Option: CustomOption, SingleValue: CustomValue }}
    />
  );
};

export default Select;
