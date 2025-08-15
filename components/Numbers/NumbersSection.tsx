import React, { useState, useEffect } from 'react';
import { fetchData } from '../Helpers';
import {
	faUsers,
	faUserGraduate,
	faChalkboardTeacher,
  } from '@fortawesome/free-solid-svg-icons';

import { IconNumbers } from './IconNumbers';
import styles from './NumbersSection.module.scss';

export const NumbersSection = () => {
	const [graduates, setGraduates] = useState(20000);
	const [opinions, setOpinions] = useState(4.0);
	const [courses, setCourses] = useState(2000);

	async function loadNUmbers() {
		try {
			const response = await fetch('/api/numbers');
			const data = await response.json();
			setGraduates(data.students);
			setOpinions(1570);
			setCourses(data.courses);
		} catch (error) {
			console.error('Failed to load numbers:', error);
		}
	}

	useEffect(() =>  {
		loadNUmbers();
	}, []);

  return (
	<section className={styles.container}>
		<IconNumbers icon={faUserGraduate} num={graduates} info="Absolwentów" />
        <IconNumbers icon={faChalkboardTeacher} num={courses} info="Przep. kursów" />
        <IconNumbers icon={faUsers} num={opinions} info="Opinii" />
    </section>
  );
};
