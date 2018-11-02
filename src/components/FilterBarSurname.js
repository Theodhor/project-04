import React from 'react';

const FilterBarSurname = ({ handleChange }) => {
  return (
    <form>
      <div className="field is-grouped">
        <div className="control is-expanded has-icons-left">
          <input className="input" name="searchSurname" onChange={handleChange} placeholder="Search for friends by surname..." />
          <span className="icon is-small is-left">
            <i>🔍</i>
          </span>
        </div>
      </div>
    </form>
  );
};

export default FilterBarSurname;
