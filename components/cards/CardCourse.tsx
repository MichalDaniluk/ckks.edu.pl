import React from 'react';

import { setDateTermFormat } from '@components/Helpers';
import CourseCategory from '@components/base/CourseCategory';
import CourseTitle from '@components/base/CourseTitle';

const CardCourse = (item: any) => {
	const {nazwa,kategoria,href,data_od,data_do,miejscowosc,specjalizacja} = item.course;
  return (
	<>
		<CourseCategory category={kategoria} />
		<a className="title" href={`kurs/${href}`}><CourseTitle title={specjalizacja} /></a>
        <div className="dates">{setDateTermFormat(data_od, data_do)}</div>
        <div className="name">{nazwa}</div>
        <div className="city">{miejscowosc}</div>
    </>
  );
};

export default CardCourse;
