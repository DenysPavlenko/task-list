import clsx from 'clsx';
import css from './Button.module.scss';

const Button = ({
  children,
  type = 'button',
  variant,
  className,
  active = false,
  disabled,
  ...otherProps
}) => {
  const classes = clsx({
    [css.button]: true,
    [css.primary]: variant === 'primary',
    [css.active]: active,
    [className]: className,
  });

  return (
    <button className={classes} type={type} {...otherProps} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
