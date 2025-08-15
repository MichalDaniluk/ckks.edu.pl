import Layout from '../components/Layout';
import React from 'react';

import '../styles/globals.scss';
//import type AppProps from 'next/app'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
