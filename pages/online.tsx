import React from 'react';

import { CardCourseGeneral } from '@components/cards/CardCourseGeneral';
import  { fetchData } from '@components/Helpers';
import { CourseItem } from '@interfaces/Course';

export async function getServerSideProps() {

  const courses = await fetchData<CourseItem[]>('https://api.ckks.pl/api/course/online');

  if (!courses) {
    return {
      notFound: true,
    };
  }

  return {
    props: { courses },
  };
}

const Online = (courses:CourseItem[]) => {
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

export default Online;
