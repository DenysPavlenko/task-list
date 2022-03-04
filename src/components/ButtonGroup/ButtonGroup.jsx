import css from './ButtonGroup.module.scss';

const ButtonGroup = ({ children }) => {
  return <div className={css.container}>{children}</div>;
};

export default ButtonGroup;
