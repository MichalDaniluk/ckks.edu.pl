import React from 'react';
import Head from './Head';

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
};

export default Meta;
