import React from 'react';
import Footer from './footer/Index';
import Nav from './Nav';

export const metadata = {
  title: "Blog - Centrum Kształcenia Kadr Sportowych",
  description: "Centrum Kształcenia Kadr Sportowych, kursy, szkolenia"
};

const Layout = ({ children }) => {
  return (
    <div className="bigContainer overflow-hidden">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
