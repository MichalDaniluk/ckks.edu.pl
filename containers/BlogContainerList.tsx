import React  from 'react';

import { CardCourseBlog } from '@components/cards/CardCourseBlog';
import { BlogItem } from '@interfaces/BlogTypes';

export const BlogContainerList = (items:BlogItem[]) => {

  return (
	<div className="section-courses">
		{items.map((item,key) => (
			<CardCourseBlog
			obrazek={item.obrazek}
			nazwa={item.nazwa}
			zajawka={item.zajawka}
			href={item.href}
			key={key}
			/>
		))}
		</div>
  );
};
