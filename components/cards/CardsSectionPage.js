import CardPage from './CardPage';
import React from 'react';
import PropTypes from 'prop-types';

const CardsSectionPage = ({ title, courses = [] }) => {
  return (
    <>
      <div className="">{title && <h2>{title}</h2>}</div>
      <div className="section-courses">
        {courses.map((course, index) => (
          <CardPage key={index} item={course} />
        ))}
      </div>
    </>
  );
};

CardsSectionPage.propTypes = {
  title: PropTypes.string.isRequired,
  courses: PropTypes.array.isRequired,
};

CardsSectionPage.defaultProps = {
  title: '',
  courses: [],
};

export default CardsSectionPage;
