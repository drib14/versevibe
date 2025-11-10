import { classNames } from '../utils/helpers';

const Avatar = ({ src, alt, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const avatarClass = classNames(
    'rounded-full object-cover',
    sizes[size],
    className
  );

  return (
    <img
      src={src || '/assets/avatars/default.png'}
      alt={alt || 'User Avatar'}
      className={avatarClass}
    />
  );
};

export default Avatar;