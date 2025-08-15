import React from 'react';
import { useState, useEffect } from 'react';

const filters = ({
  filter2Handler,
  searchHandler,
  searchState,
  filterState,
  filter2State,
  setFiltered,
  menu,
  group,
  items,
}) => {
  useEffect(() => {
    if (searchState == '' && filterState == '' && filter2State == '') {
      setFiltered(items);
      return;
    }
    const filteredStaff = items.filter(
      item =>
        item.imie_nazwisko.toLowerCase().includes(searchState.toLowerCase()) &&
        item.menu.includes(filterState) &&
        item.group.includes(filter2State)
    );
    setFiltered(filteredStaff);
  }, [filterState, filter2State, searchState]);

  const [value, setValue] = useState('');
  const [value2, set2Value] = useState('');

  const filterGroup = () => {
    return group.filter(g => g.menu.includes(value));
  };

  let filteredGroup = filterGroup();

  const clearSelect = () => {
    window.secondFilter.value = '';
  };

  return (
    <div className="filters">
      <p>
        <select
          id="firstSelect"
          className="filters-select first-filter option-set"
          value={value}
          onChange={e => {
            setValue(e.target.value);
            set2Value('');
            filterGroup();
            clearSelect();
          }}
        >
          <option value="">Cała kadra</option>
          {menu.map((m, index) => (
            <option key={index} value={m.value}>
              {m.value.replace('Medyczne', 'Fizjoterapia')}
            </option>
          ))}
        </select>
      </p>
      <p>
        <select
          id="secondFilter"
          className="filters-select"
          onChange={e => {
            set2Value(e.target.value);
          }}
        >
          <option value="" onClick={filter2Handler(value2)}>
            Wszystkie kursy
          </option>
          {filteredGroup.map((m, index) => (
            <option key={index} value={m.key} onClick={filter2Handler(value2)}>
              {m.value}
            </option>
          ))}
        </select>
      </p>
      <p>
        <input
          type="text"
          className="quicksearch"
          placeholder="Szukaj"
          onChange={e => {
            searchHandler(e.target.value);
          }}
        />
      </p>
    </div>
  );
};

export default filters;
