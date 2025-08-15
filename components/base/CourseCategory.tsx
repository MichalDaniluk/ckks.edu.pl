import React from 'react';
import { CategoryName } from '@interfaces/Course';

function CourseCategory({category}:CategoryName) {
  return <div className="type">{category ?? 'Kategoria'}</div>;
}

export default CourseCategory;
