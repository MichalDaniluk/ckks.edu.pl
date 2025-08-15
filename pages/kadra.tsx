import React from 'react';
import PageTop from '@components/PageTop';
import Header from '@components/Head';
import { InstructorsList } from '@components/kadra/InstructorsList';
import { InstructorItems, InstructorImages, IGroup } from '@interfaces/Course';
import { IPageHeader, IPageTop } from '@interfaces/Common';
import { IMenu } from '@interfaces/Common';
import { fetchData } from '@components/Helpers';

export async function getServerSideProps() {

const instructors = await fetchData<InstructorItems>('https://api.ckks.pl/api/instructors');
const menu = await fetchData<IMenu[]>('https://api.ckks.pl/api/menu');
const group = await fetchData<IGroup[]>('https://api.ckks.pl/api/group');
const images = await fetchData<InstructorImages>('https://api.ckks.pl/api/instructors/images');

  if (!instructors || !images || !menu || !group) {
    return {
      notFound: true,
    };
  }

  return {
    props: { instructors, menu, group, images },
  };
}

const Instructors = ({instructors, images}) => {

	const PageHeaderProps:Partial<IPageHeader> = {
		title: "Centrum Kształcenia Kadr Sportowych - Kadra",
		query: "/",
		keywords: "ckks szkolenie kursy",
		description:"Kadra ckks.pl"
	};

	const PageTopProps:IPageTop = {
		title:"Nasz kadra",
		bgImage:"/img/header/kadra.jpg"
	};

	return (
    <>
      <Header
			title={PageHeaderProps.title}
			keywords={PageHeaderProps.keywords}
			description={PageHeaderProps.description}
			image={PageTopProps.bgImage}
			query={PageHeaderProps.query}
		/>
      <PageTop
			title={PageTopProps.title}
			bgImage={PageTopProps.bgImage}
		/>
      <div className="staff">
			<div className="section-courses">
				<InstructorsList items={instructors} images={images}/>
			</div>
		</div>
    </>
	);
};

export default Instructors;
