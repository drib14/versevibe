import { Link } from 'react-router-dom';
import { classNames } from '../utils/helpers';

const Button = ({
  as: Component = 'button', 
  to, 
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 inline-flex items-center justify-center';

  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-400 text-white shadow-lg',
    secondary: 'bg-transparent hover:bg-gray-700 focus:ring-indigo-500 border border-gray-600 text-gray-300 disabled:border-gray-800 disabled:text-gray-500',
    outline: 'bg-transparent border-2 border-indigo-500 hover:bg-indigo-500 focus:ring-indigo-500 text-indigo-400 disabled:border-gray-800 disabled:text-gray-500',
    danger: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-400 text-white',
    ghost: 'hover:bg-gray-700 text-gray-300 disabled:text-gray-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  const loadingContent = loading ? 'Loading...' : children;

  const buttonClass = classNames(
    baseStyles,
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  
  if (Component === Link) {
    return (
      <Link to={to} className={buttonClass} {...props}>
        {loadingContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loadingContent}
    </button>
  );
};

export default Button;
