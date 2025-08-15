import React from 'react';
import CardCourse from '@components/cards/CardCourse';
import CardCourseWrapper from '@components/cards/CardCourseWrapper';
import { CourseElement } from '@interfaces/Course';

interface CardsSectionCourseProps {
  list?: CourseElement[];
  title?: string;
}

const CardsSectionCourse = ({list = [], title}: CardsSectionCourseProps) => {
  const courseList = Array.isArray(list) ? list : [];
  
  return (
      <div className="section-courses">
		{title && <h2>{title}</h2>}
        {courseList && courseList.map((course:CourseElement,index) => (
			<div key={index}>
				<CardCourseWrapper
					obrazek={course.obrazek_trzy || course.obrazek || ''}
					cena={course.cena}
					firstprice={course.firstprice}
					data_do={course.data_do}
					href={course.href}>
					<CardCourse course={course} />
				</CardCourseWrapper>
			</div>
        ))}
      </div>
  );
};

export default CardsSectionCourse;
