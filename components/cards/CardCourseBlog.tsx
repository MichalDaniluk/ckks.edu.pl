import React from 'react';

import CourseTitle from '@components/base/CourseTitle';
import LinkComponent from '@components/base/LinkComponent';

export const CardCourseBlog = ({obrazek,nazwa,zajawka,href}: {obrazek: string, nazwa: string, zajawka: string, href: string}) => (

	<div className="course-container cardHover" style={{cursor: 'pointer'}} onClick={() => window.location.href = `/blog/${href || ''}`}>
		<div className="course-container__image">
			<img
			src={obrazek ? (obrazek.startsWith('http') ? obrazek : `http://localhost:3001${obrazek}`) : '/img/default-blog.jpg'}
			alt=""
			width="342"
			height="213"
			/>
		</div>
		<div className="course-container__content">
		<a href={`/blog/${href || ''}`} className=""><CourseTitle title={nazwa || ''} /></a>
			<p>{zajawka ? zajawka.substring(0, 150) : ''}...</p>
		</div>
		<div className="link">
			<LinkComponent href={href ? `/blog/${href}` : '/blog'} text="czytaj dalej"/>
		</div>
	</div>
);
