import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

import SearchResults from './SearchResults';

export const SearchBar = () => {
  const [data, setData] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchInputState, setSearchInputState] = useState(0);

  const fetchSearch = () => {
    setSearched(false);
    axios({
      method: 'post',
      url: `/api/search?searchInput=${searchInputState}`,
    })
      .then(function (response) {
        setData(response.data);
        setSearched(true);
      })
      .catch(function () {
        setSearched(false);
      });
  };
  useEffect(() => {
    {
      if (searchInputState !== 0) {
        fetchSearch();
      }
    }
  }, [searchInputState]);

  const closeSearch = () => {
    setSearchInputState(0);
    window.sinput.value = '';
  };

  return (
    <>
      <input
        id="sinput"
        className="nav__search-bar-input"
        type="text"
        placeholder=" Szukaj"
        onChange={(e) => {
          setSearchInputState(e.target.value);
        }}
      />
      <CSSTransition
        in={searchInputState.length >= 2}
        timeout={700}
        className="searchRes"
        unmountOnExit
      >
        <>
          {searched && <SearchResults data={data} />}
          <div className="closeSearch" onClick={() => closeSearch()}></div>
        </>
      </CSSTransition>
    </>
  );
};
