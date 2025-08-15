import React from 'react';
import {getFileNameFromPath,setDateTermFormat} from '@components/Helpers';
import ShowPrice from '@components/base/ShowPrice';
import CourseImage from '@components/cards/CourseImage';
import CourseTitle from '@components/base/CourseTitle';

const ActualCoursesItem = ({ item }) => {
	if (item == undefined || item === null) return <div></div>;
	const validImage = getFileNameFromPath(item.obrazek_trzy);

  return (
    <div className="course-container">
		<div className="course-container__image">
		<CourseImage
          image={`/o/f/${validImage}`}
          alt={'/kurs/'+item.href}
        />
		</div>
		<div className="course-container__content">
			<a href={'/kurs/'+item.href}><CourseTitle title={item.nazwa} /></a>
			<ul>
				<li>{setDateTermFormat(item.data_od,item.data_do)}</li>
				<li>{item.miejscowosc}</li>
				<li>{item.opis}</li>
			</ul>
			<div className="course-container__price">
			<ShowPrice firstprice={item.firstprice} date={item.data_od} price={item.cena} />
		</div>
      </div>
	</div>
  );
};

export default ActualCoursesItem;
