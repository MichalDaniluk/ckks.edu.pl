import React from 'react';
import axios from 'axios';
import Header from '@components/Head';
import PageTop from '@components/PageTop';

export async function getServerSideProps({ query }) {
	const apiUrl = process.env.CKKS_API_URL || 'http://localhost:3001';

	try {
		const data = await axios.get(`${apiUrl}/api/blog/${query.pid}`).then(item => {return item.data;});

		if (!data) {
			return {
			notFound: true,
			};
		}

		return {
			props: { data, query },
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
}

export const NewsItem = ({ data, query }) => {

  return (
    <>
      <Header
        title={data.title || data.tytul}
        description={data.excerpt || data.tytul}
        query={`news/${query.pid}`}
        image={data.image || '/galeria/'+data.obrazek_nowa}
		keywords="news aktualnosci z ckks"
      />
	<PageTop title={data.title || data.tytul} bgImage={data.image || '/galeria/'+data.obrazek_nowa} />
      <div className="news-item">
        <div dangerouslySetInnerHTML={{ __html: data.content || data.body }} />
      </div>
    </>
  );
};

export default NewsItem;
