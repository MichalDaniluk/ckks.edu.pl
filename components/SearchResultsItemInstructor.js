import React from 'react';
import Image from "next/legacy/image";

import { polishLettersToLatin } from '../components/Helpers';

function SearchResultsItem({ index, searchItem }) {
  return (
    <>
      <a href={`/instruktor/${searchItem.instruktor_id}`} key={index}>
        <article className="searchResultContainer__item">
          <picture className="searchResultContainer__image">
            {searchItem.title && (
              <Image
                src={`/o/instruktor/${polishLettersToLatin(searchItem.title) +
                  '.jpg'}`}
                height={100}
                width={140}
                className="searchImg"
              />
            )}
          </picture>
          <div>
            <h3>{searchItem.title}</h3>
            <p>{searchItem.zajawka}</p>
          </div>
        </article>
      </a>
    </>
  );
}

export default SearchResultsItem;
