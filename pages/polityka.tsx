import React from 'react';

import Header from '@components/Head';
import PageTop from '@components/PageTop';

export async function getStaticProps() {
  const response = await fetch('https://api.ckks.pl/api/page/policy');
  const data = await response.json();

  return {
    props: { data },
  };
}

const Policy = ({data}) => {
  return (
    <>
      <Header
        title="Polityka prywatności"
        description="polityka prywatnosci"
        query="polityka"
        image=""
		keywords="polityka prywatności firmy ckks"
      />
      <PageTop title="Polityka prywatności" bgImage="/img/header/kadra.jpg" />
      <div className="container">
        <div dangerouslySetInnerHTML={{__html:data.body}} />
      </div>
    </>
  );
};

export default Policy;
