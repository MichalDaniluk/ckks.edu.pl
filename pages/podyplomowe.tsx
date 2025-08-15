import React from 'react';
import PageTop from '@components/PageTop';
import Header from '@components/Head';
import { CardCourseGeneral } from '@components/cards/CardCourseGeneral';

export async function getServerSideProps() {
  const res = await fetch('https://api.ckks.pl/api/course/studies');
  const courses = await res.json();

  if (!courses) {
    return {
      notFound: true,
    };
  }

  return {
    props: { courses }
  };
}

const PostgraduateStudies = ({courses} ) => {
  return (
	<>
		<Header
		title="Centrum Kształcenia Kadr Sportowych - Kadra"
		description="Kadra ckks.pl"
		image="/img/header/kadra.jpg"
		keywords="Studia podyplomowe"
		query="/podyplomowe"
		/>
		<PageTop title="Studia podyplomowe" bgImage="/img/header/kadra.jpg" />

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
	</>
  );
};

export default PostgraduateStudies;
