import PropTypes from 'prop-types';
import css from './ButtonGroup.module.scss';

const ButtonGroup = ({ children }) => {
  return <div className={css.container}>{children}</div>;
};

ButtonGroup.propTypes = {
  children: PropTypes.node,
};

export default ButtonGroup;
