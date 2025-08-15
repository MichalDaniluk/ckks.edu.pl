import React from 'react';
import CardsSectionPage from '../components/cards/CardsSectionPage';
import PageTop from '../components/PageTop';
import Header from '../components/Head';

export async function getServerSideProps() {
  const res = await fetch('https://api.ckks.pl/api/funding');
  const list = await res.json();

  if (!list) {
    return {
      notFound: true,
    };
  }

  return {
    props: { list },
  };
}

type Props = {
	list:[
		{
			obrazek:string,
			nazwa:string,
			zajawka:string,
			href:string,
			cena:string
		}
	]
}

const Supplement:React.FC<Props> = ({ list }) => {
  return (
	<>
	<Header
		title="Dofinansowania do szkoleń"
		description="dofinansowania ckks.pl, centrum kształcenia kadr sportowych, kursy, szkolenia"
		query="dofinansowania"
		image="/img/header/blog.jpg"
		keywords="szkolenia dofinansowane"
	/>
	<PageTop title="Dofinansowania do szkoleń" bgImage="/img/header/blog.jpg" />
	<CardsSectionPage courses={list} />
  </>);
};

export default Supplement;
