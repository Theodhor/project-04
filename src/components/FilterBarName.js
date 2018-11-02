import React from 'react';

const FilterBarName = ({ handleChange }) => {
  return (
    <form>
      <div className="field is-grouped">
        <div className="control is-expanded has-icons-left">
          <input className="input" name="searchName" onChange={handleChange} placeholder="Search for friends by name..." />
          <span className="icon is-small is-left">
            <i>🔍</i>
          </span>
        </div>
      </div>
    </form>
  );
};

export default FilterBarName;
