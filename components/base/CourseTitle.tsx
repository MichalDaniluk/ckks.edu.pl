import React from 'react';
import { CourseTitle } from '@interfaces/Course';

const CourseTitle  = ({title}:CourseTitle) => {
  return (
		<h4 className="title">{title}</h4>
	);
};

export default CourseTitle;
