import React from 'react';
import { SwiperSlide } from 'swiper/react';

interface Item {
	obrazek:string
	tytul:string;
	opis:string;
	link:string;
}

interface Items {
	items:Item[]
}

function SwiperItems(items:Items,title:string) {
	return (
		<>test</>
	);
}


export default SwiperItems;
