import React from 'react';
import Link from 'next/link';

import LinkItem from './LinkItem';
import Links from './Links.json';

const FooterMenu = () => {
  return (

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 footerBg md:p-[4rem] p-2">
      {Links.map((link, key) => (
        <LinkItem key={key} title={link.title} href={link.href} />
      ))}
    </div>

  );
};

export default FooterMenu;
