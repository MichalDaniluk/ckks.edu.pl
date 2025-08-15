import React from 'react';

import CourseImage from '@components/cards/CourseImage';
import CourseTitle from '@components/base/CourseTitle';
import CourseCategory from '@components/base/CourseCategory';
import ShowPrice from '@components/base/ShowPrice';


export const CardCourseGeneral = ({
  specjalizacja,
  obrazek_trzy,
  href,
  kategoria,
  zajawka,
  firstprice,
  data_od,
  cena,
}) => {
  let title = '';

  if (specjalizacja) {
    title =
      specjalizacja.length > 60
        ? title + '...'
        : specjalizacja.substring(0, 60);
  }

  return (
    <div className="course-container" key={href}>
      <div className="course-container__image">
        <CourseImage image={obrazek_trzy && obrazek_trzy.startsWith('http') ? obrazek_trzy.replace(/^https?:\/\/[^/]+/, '') : (obrazek_trzy && obrazek_trzy.startsWith('/') ? obrazek_trzy : `/img/${obrazek_trzy || 'nie-wybrano.jpg'}`)} alt={href} />
      </div>
      <div className="course-container__content">
        <CourseCategory title={kategoria} />
        <a href={`/kurs/${href}`}>
          <CourseTitle title={title} />
        </a>
        <p>{zajawka ? zajawka.substring(0, 120) : ''}...</p>
        <div className="course-container__price">
          <ShowPrice firstprice={firstprice} date={data_od} price={cena} />
        </div>
      </div>
    </div>
  );
};
