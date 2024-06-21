// components/Filter/Filter.js

import React, { useState } from 'react';

const Filter = ({ filterOptions, onApplyFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (option, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [option]: prevFilters[option]
        ? prevFilters[option].includes(value)
          ? prevFilters[option].filter((item) => item !== value)
          : [...prevFilters[option], value]
        : [value],
    }));
  };

  return (
    <div>
      {filterOptions.map((option) => (
        <div key={option.label}>
          <h5>{option.label}</h5>
          {option.values.map((value) => (
            <div key={value}>
              <label>
                <input
                  type="checkbox"
                  value={value}
                  onChange={() => handleFilterChange(option.label, value)}
                />
                {value}
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Filter;