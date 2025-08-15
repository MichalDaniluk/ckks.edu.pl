import React from 'react';

import {
	setPriceFormat,
	setFirstPriceFormat,
	getDateNow,
  } from '@components/Helpers';

import {firstPrice, showPrice} from '@interfaces/Course';

const ShowPrice = ({firstprice,date,price}:showPrice) => {
	const calculatePrice =  firstprice === firstPrice.YES
	? 'Cena od: ' + setFirstPriceFormat(getDateNow(), date, parseInt(price))
	: 'Cena: ' + setPriceFormat(parseInt(price));

	return <div className="price">{calculatePrice}</div>;

};

export default ShowPrice;
