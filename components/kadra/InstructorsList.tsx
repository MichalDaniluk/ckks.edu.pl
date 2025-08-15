import React from 'react';
import {InstructorItems, InstructorImages} from '@interfaces/Course';
import Instructor from '@components/kadra/instructor';

export const InstructorsList = ({items, images}) => {

	const getImage = (instruktor_id:number):string|null => {
		return images.filter((image) => image.instruktor_id === instruktor_id)[0]?.plik ?? null;
	};
	return (
		<>
			{items.map((item,key) =>(
				<Instructor key={key} item={item} image={getImage(item.instruktor_id)}/>
			))}
		</>
	);
};
