import React from 'react';
import Link from 'next/link';

type LinkProp = {
	title:string
	href:string
}

const LinkItem:React.FC<LinkProp> = ({title, href}) => {
  return (
    <div className="p-2 md:p-4">
      <Link href={href} className="uppercase text-xs">
          {title}
      </Link>
    </div>
  );
};

export default LinkItem;
