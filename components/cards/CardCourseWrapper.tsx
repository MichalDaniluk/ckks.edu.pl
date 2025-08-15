import React, {ReactNode} from 'react';
import Link from 'next/link';

import ShowPrice from '@components/base/ShowPrice';
import { firstPrice } from '@interfaces/Course';


interface Card {
	obrazek:string,
	children:ReactNode,
	firstprice:firstPrice,
	data_do:string,
	cena:string,
	href:string
}

const CardCourseWrapper = ({obrazek="", children, firstprice, data_do, cena, href}:Card) => {

  return (
    <div className="course-container">
      <div className="course-container__image">
		<Link href={`/kurs/${href}`}>
		{obrazek && <img src={obrazek.startsWith('http') ? obrazek.replace(/^https?:\/\/[^/]+/, '') : (obrazek.startsWith('/') ? obrazek : `/img/${obrazek}`)} width="300" height="180" alt="" loading="lazy" style={{
			width: '100%',
			height: 'auto',
			objectFit: 'cover'
		}}/>}
		</Link>
      </div>
      <div className="course-container__content">{children}</div>
      <ShowPrice firstprice={firstprice} date={data_do} price={cena} />
    </div>
  );
};

export default CardCourseWrapper;
