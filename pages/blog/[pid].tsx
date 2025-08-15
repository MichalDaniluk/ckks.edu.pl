import React from 'react';
import axios from 'axios';

import LinkComponent from '@components/base/LinkComponent';
import PageTop from '@components/PageTop';
import Header from '@components/Head';

export async function getServerSideProps({query}) {

	const blog = await (await axios.get(`https://api.ckks.pl/api/blog/${query.pid}`)).data;

	if (!blog) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			blog,
			revalidate:60
		}
	};
}

const BlogPage = ({blog}) => {
//style={{ backgroundImage: `url(/blog/files/${blog.plik_duzy})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}
	return(
		<div>
			<div className="mt-24 md:w-[90rem] md:m-auto mx-6 my-4 sm:mx-8 lg:mx-12">

				<Header
				title={blog.tytul}
				description={`blog ckks.pl ${blog.tytul}`}
				query={`blog/${blog.pid}`}
				image={`/blog/files/${blog.plik_duzy}`}
				keywords={blog.tytul}
				/>

				<PageTop
				title={blog.tytul}
				bgImage=''
				/>

				<div dangerouslySetInnerHTML={{ __html: blog.body }} />

			<LinkComponent href="/blog" text="Wróć do listy wpisów" />
			</div>
		</div>
	);
};

export default BlogPage;
