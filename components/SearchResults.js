import React from 'react';
import SearchResultsItem from './SearchResultsItem';
import SearchResultsItemInstructor from './SearchResultsItemInstructor';

const SearchResults = ({ data }) => {
  let kursy = data.Courses;
  let news = data.News;
  let blog = data.Blog;
  let instructors = data.Instructors;
  return (
    <div className="searchResultContainer">
      {kursy.length > 0 && (
        <div className="searchResultContainer__category">
          <h5>Nasze kursy:</h5>
          {kursy.map((kursItem, index) => (
            <SearchResultsItem
              key={index}
              searchItem={kursItem}
              preUrl="kurs"
            />
          ))}
        </div>
      )}
      {blog.length > 0 && (
        <div className="searchResultContainer__category">
          <h5>Blog:</h5>
          {blog.map((blogItem, index) => (
            <SearchResultsItem
              key={index}
              searchItem={blogItem}
              preUrl="blog"
            />
          ))}
        </div>
      )}
      {news.length > 0 && (
        <div className="searchResultContainer__category">
          <h5>Aktualności:</h5>
          {news.map((newsItem, index) => (
            <SearchResultsItem
              key={index}
              searchItem={newsItem}
              preUrl="news"
            />
          ))}
        </div>
      )}
      {instructors.length > 0 && (
        <div className="searchResultContainer__category">
          <h5>Instruktorzy:</h5>
          {instructors.map((instItem, index) => (
            <SearchResultsItemInstructor
              key={index}
              searchItem={instItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
