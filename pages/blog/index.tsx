import React, { Suspense } from 'react';
import axios from 'axios';
import PageTop from '@components/PageTop';
import Header from '@components/Head';
import { CardCourseBlog } from '@components/cards/CardCourseBlog';
import { BlogItems } from '@interfaces/BlogTypes';

export async function getServerSideProps() {
	const apiUrl = process.env.CKKS_API_URL || 'http://localhost:3001';
	
	try {
		const items = await axios.get(`${apiUrl}/api/blog`).then(item => {return item.data;});

		if (!items) {
			return {
			notFound: true,
			};
		}

		return {
			props: {
				items,
				revalidate:60
			}
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
}

const Blog = ({items}:BlogItems) => {
  return (
    <>
      <Header
        title="Blog - Centrum Kształcenia Kadr Sportowych"
        description="Blog ckks.pl, centrum kształcenia kadr sportowych, kursy, szkolenia"
        query="blog"
        image="/img/header/blog.jpg"
		keywords="blog ckks"
      />
	<PageTop title="Blog Centrum Kształcenia Kard Sportowych" bgImage="/img/header/blog.jpg" />
	<Suspense fallback="Wczytuję dane...">
	<div className="section-courses">
		{items.map((item: any,key) => (
			<CardCourseBlog
			obrazek={item.image || item.obrazek || ''}
			nazwa={item.title || item.nazwa || ''}
			zajawka={item.excerpt || item.zajawka || ''}
			href={item.slug || item.href || ''}
			key={key}
			/>
		))}
		</div>
	</Suspense>
    </>
  );
};

export default Blog;
