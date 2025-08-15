import React from 'react';

import Head from 'next/head';

const Header = ({title, keywords, description, query, image}) => {
  return (
		<Head>
			<title>{title}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			<link rel="shortcut icon" href="/img/favicon.png" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={`https://ckks.pl/${query}`} />
			{image && <meta property="og:image" content={image} />}
			<meta property="og:site_name" content="Centrum Kształcenia Kadr Sportowych"/>
			<meta property="og:locale" content="pl_PL" />
			<meta property="og:type" content="article" />
		</Head>
  );
};

export default Header;
