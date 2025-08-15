import React from 'react';

import ActualCoursesItem from './ActualCoursesItem';

const ActualCourses = ({ courses = [] }) => {
  return (
    <>
      <h2>Prowadzi kursy</h2>
      <div className="section-courses">
        {courses.length > 0 &&
          courses.map((course, index) => (
            <ActualCoursesItem item={course} key={index} />
          ))}
      </div>
    </>
  );
};

export default ActualCourses;
