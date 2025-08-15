import { CardCourseGeneral } from '@components/cards/CardCourseGeneral';
import React from 'react';
import {CourseItem} from '@interfaces/Course';

const CardsSectionCourse = (courses:CourseItem[]) => {

  return (
    <div className="section-courses">
      {courses.map((course,key) => (
        <CardCourseGeneral
			key={key}
			specjalizacja={course.specjalizacja}
			obrazek_trzy={course.obrazek_trzy}
			href={course.href}
			kategoria={course.kategoria}
			zajawka={course.zajawka}
			firstprice={course.firstprice}
			data_od={course.data_od}
			cena={course.cena}
		/>
      ))}
    </div>
  );
};

export default CardsSectionCourse;
