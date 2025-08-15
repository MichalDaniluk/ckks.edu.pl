import React, {useEffect, useState} from 'react';
import axios from 'axios';

import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import TestimonySwiper from '@components/swipers/TestimonySwiper';

SwiperCore.use([Navigation, Pagination, Autoplay]);

type Opinion = {
  id: number;
  nazwa: string;
  tresc: string;
  ocena: number;
  data?: string;
}

const TestimonySwiperContainer = () => {
	const [opinions, setOpinions] = useState<Opinion[]>([]);

	async function loadOpinions() {
		await axios.get('/api/start/opinions')
		.then((response) => {
			setOpinions(response.data);
		});
	}

	useEffect(() => {
		loadOpinions();
	},[]);

  return <TestimonySwiper opinions={opinions} />;
};

export default TestimonySwiperContainer;
