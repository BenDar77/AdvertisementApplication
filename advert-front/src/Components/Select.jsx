import React from 'react';

const Select = ({ value, onChange, categories, className }) => {
  
  return (
    <form className="max-w-sm mx-auto flex-1">
      <label htmlFor="categories" className="block mb-3 text-sm font-medium text-[rgb(0,223,154)] w-full">
        Select advert category:
      </label>
      <select 
        id="categories"
        className={`block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${className}`}
        value={value} 
        onChange={e => onChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </form>
  );
};

export default Select;