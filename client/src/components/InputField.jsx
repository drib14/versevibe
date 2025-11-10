import { useState } from 'react';
import { classNames } from '../utils/helpers';

const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  className = '',
  isTextarea = false,
  tags = false, 
  ...props
}) => {
  const [tagInput, setTagInput] = useState('');
  const [localTags, setLocalTags] = useState(value || []);

  
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTags = [...localTags, tagInput.trim()];
      setLocalTags(newTags);
      setTagInput('');
      onChange({ target: { name, value: newTags } });
    }
  };

  const removeTag = (index) => {
    const newTags = localTags.filter((_, i) => i !== index);
    setLocalTags(newTags);
    onChange({ target: { name, value: newTags } });
  };

  const baseStyles = 'w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-900 disabled:text-gray-500';
  const errorStyles = error ? 'border-indigo-500 focus:ring-indigo-500' : '';
  const inputClass = classNames(baseStyles, errorStyles, className);

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      {tags ? (
        <div>
          <input
            type="text"
            name={name}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder={placeholder || 'Add tags and press Enter'}
            className={inputClass}
            disabled={disabled}
            {...props}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {localTags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-indigo-600 text-white rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-2 text-white hover:text-gray-300"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      ) : isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={classNames(inputClass, 'min-h-[120px] resize-y')}
          disabled={disabled}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClass}
          disabled={disabled}
          {...props}
        />
      )}
      {error && <p className="mt-1 text-sm text-indigo-500">{error}</p>}
    </div>
  );
};

export default InputField;