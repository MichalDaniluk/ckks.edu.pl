import Page from '../components/Page';
import React from 'react';
import Header from '../components/Head';
import PageTop from '../components/PageTop';
import { fetchData } from '../components/Helpers';
import { IPage } from '@interfaces/Course';

export async function getServerSideProps() {

  const page = await fetchData<IPage>('https://api.ckks.pl/api/page/about');

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: { page },
  };
}

const About = ({page}:{page:IPage}) => {
	return (
	<>
		<Header
			title="Last minute - o nas"
			description="O nas"
			query="/onas"
			image=""
			keywords="o nas, ckks"
		/>
		<PageTop title='onas' bgImage='' />
		<div className="container about">
		<Page body={page.body} />
		</div>
	</>
	);
};

export default About;
