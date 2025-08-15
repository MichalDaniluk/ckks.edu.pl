import React from 'react';

import CourseImage from '@components/cards/CourseImage';
import CourseTitle from '@components/base/CourseTitle';

const CardPage = ({item}: {item: any}) => {
  return (
	<div className="course-container">
		<div className="course-container__image">
          <CourseImage
            image={item.obrazek}
            alt={item.href}
          />
        </div>
		<div className="course-container__content">
			<a href={item.href}><CourseTitle title={item.nazwa} /></a>
			<p>{item.zajawka ? item.zajawka.substring(0, 150) : ''}...</p>
		</div>
	</div>
  );
};

export default CardPage;
