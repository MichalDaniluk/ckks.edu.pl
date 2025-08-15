import React from 'react';
import Image from "next/legacy/image";
import { getFileNameFromPath } from './Helpers';

function SearchResultsItem({ index, searchItem, preUrl }) {
  const validImage = getFileNameFromPath(searchItem.obrazek_trzy);
  return (
    <>
      <a href={`/${preUrl}/${searchItem.href}`} key={index}>
        <article className="searchResultContainer__item">
          <picture className="searchResultContainer__image">
            {validImage && (
              <Image
                src={`/o/f/${validImage}`}
                height={100}
                width={140}
                alt=""
              />
            )}
          </picture>
          <div>
            <h3 className="searchResultContainer__title">{searchItem.title}</h3>
            <p className="searchResultContainer__description">
              {searchItem.zajawka}
            </p>
          </div>
        </article>
      </a>
    </>
  );
}

export default SearchResultsItem;
