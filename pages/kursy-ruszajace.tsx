import React from 'react';
import CardsSectionCourse from '@components/cards/CardsSectionCourse';
import Header from '@components/Head';
import PageTop from '@components/PageTop';
import { fetchData } from '@components/Helpers';

export const getStaticProps = async () => {
  let courses = [];

  try {
    const apiUrl = process.env.CKKS_API_URL || 'http://localhost:3001';
    courses = await fetchData(`${apiUrl}/api/course/running/20`);
    if (!courses || !Array.isArray(courses)) {
      courses = [];
    }
  } catch (error) {
    console.log('Failed to fetch courses:', error);
    courses = [];
  }

  return {
    props: { courses: courses || [] },
    revalidate: 60
  };
};

const Running = ({ courses }) => {

  return (
    <>
		<Header
			title="Kursy ruszające na 100%"
			description="kursy ruszające ckks"
			image="/img/header/kursy_ruszajace.jpg"
			keywords="kursy ruszające 100%"
			query="/kursy-ruszajace"
		/>
		<PageTop title="Kursy ruszające na 100%" bgImage="/img/header/kursy_ruszajace.jpg" />
		<CardsSectionCourse title="" list={courses} />
    </>
  );
};

export default Running;
