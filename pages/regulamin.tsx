import React from 'react';
import Header from '../components/Head';
import PageTop from '../components/PageTop';

export async function getStaticProps() {
  const response = await fetch('https://api.ckks.pl/api/page/statute');
  const data = await response.json();

  return {
    props: { data },
  };
}

const Statute = (data) => {
	return (
		<>
		<Header
			title="Regulamin ckks"
			description="ckks regulamin"
			query="regulamin"
			image=""
			keywords="regulamin ckks"
		/>
		<PageTop title="Regulamin CKKS" bgImage="/img/header/kadra.jpg" />
		<div className="container">
				<div dangerouslySetInnerHTML={{__html: data.data.body}} />
		</div>
		</>
	);
};

export default Statute;
