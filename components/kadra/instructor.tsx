import React from 'react';
import Image from "next/image";
import CourseTitle from '@components/base/CourseTitle';

const Instructor = ({item, image}) => {

	if( item === null || item === undefined ) {
		return (<></>);
	}

	const img = `/o/instruktor/${image}`;
  return (
    <div className="course-container">
		<div className="course-container__image">
			<Image src={img} alt={item.imie_nazwisko} width="150" height="150" />
		</div>
		<div className="course-container__content">
        <a href={`/instruktor/${item.instruktor_id}`} title="czytaj dalej"><CourseTitle title={item.imie_nazwisko} /></a>
		<div className="course-container__shortinfo" dangerouslySetInnerHTML={{ __html: item.zajawka }} />
		</div>
	</div>

  );
};

export default Instructor;
