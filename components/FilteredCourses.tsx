import React from 'react';
import { CardCourseGeneral } from './cards/CardCourseGeneral';

export const FilteredCourses = ( {filteredCourses} ) => {
	return(
		<div className="section-courses">
			{filteredCourses.map((course, index) => (
				<CardCourseGeneral key={index}
					specjalizacja={course.specjalizacja}
					obrazek_trzy={course.obrazek_trzy || course.obrazek}
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
