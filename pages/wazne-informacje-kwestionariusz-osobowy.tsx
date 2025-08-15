import React from 'react';
import PropTypes from 'prop-types';

import Page from '@components/Page';
import Header from '@components/Head';
import PageTop from '@components/PageTop';
import  { fetchData } from '@components/Helpers';
import {IPage} from '@interfaces/Course';

export async function getStaticProps() {
  const page = await fetchData<IPage>('https://api.ckks.pl/api/page/important');

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: { page },
  };
}

const Important = (page:IPage) => {
  return (
    <>
      <Header
        title="Wazne informacje"
        description="wazne informacje dokumenty ckks"
        query="wazne-informacje-kwestionariusz-osobowy"
        image=""
		keywords="wazne informacje pliki do pobrania instrukcje"
      />
      <div className="container">
        <PageTop title="Wazne informcje i pliki do pobrania" bgImage="/img/header/kadra.jpg" />
        <Page  body={page.body} />
      </div>
    </>
  );
};

Important.propTypes = {
  page: PropTypes.object.isRequired,
};

export default Important;
