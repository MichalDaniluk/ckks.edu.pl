import React from 'react';

import { Fetcher } from '@utils/fetcher';

import Header from '@components/Head';
import PageTop from '@components/PageTop';
import GalleryContainerAll from '@components/gallery/GalleryContainerAll';

export async function getStaticProps() {
  let items = [];
  
  try {
    items = await Fetcher.request('https://api.ckks.pl/api/gallery');
    if (!items) {
      items = [];
    }
  } catch (error) {
    console.log('Failed to fetch gallery items:', error);
    items = [];
  }

  return {
    props: { items }
  };
}

const Gallery = ({ items }) => {
  return (
    <>
		<Header
			title="Galeria zdjęć z kursów Centrum Kształcenia Kadr Sportowych"
			description="galeria zdjec kursy szkolenia ckks"
			query="galeria"
			image="/img/header/galeria.jpg"
			keywords="zdjęcia z kursów, galeria zdjęć, nasze kursy"
		/>
		<PageTop title="Galeria zdjęć z naszych kursów" bgImage="/img/header/galeria.jpg" />
    <div className="md:w-[90rem] m-auto">
		<GalleryContainerAll items={items} />
    </div>
    </>
  );
};

export default Gallery;
