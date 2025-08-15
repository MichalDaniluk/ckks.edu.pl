import PropTypes from 'prop-types';
import React from 'react';
import Image from "next/legacy/image";

import Header from '@components/Head';
import {setDateTermFormat} from '@components/Helpers';
import PageTop from '@components/PageTop';

export async function getServerSideProps({ query }) {
  const res = await fetch(`https://api.ckks.pl/api/gallery/${query.pid}`);
  const items = await res.json();

  const resImages = await fetch(`https://api.ckks.pl/api/galleryImages/${query.pid}`);
  const images = await resImages.json();

  if (!items || !images) {
    return {
      notFound: true,
    };
  }

  return {
    props: { items, images, query },
  };
}

const CourseItem = ({ items, images, query }) => {
  return (
    <>
      <Header
        title={`Galeria CKKS ${query.pid}`}
        description={`galeria ckks ${query.pid}`}
        query={`galeria/${query.pid}`}
        image=""
		keywords={`galeria ${query.pid} zdjecia z kursu`}
      />
	<PageTop title="Galeria zdjęć z naszych kursów" bgImage="/img/header/galeria.jpg" />
      <div className="conainer md:w-[90rem] m-auto">
        {/* <h1>{items[0].nazwa}</h1> */}
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <h2 className="mt-24">{item.miejscowosc} - {setDateTermFormat(item.data_od, item.data_do)}</h2>
			<div className="grid gap-2 grid-cols-6">
				{images.map((image, idx)=>(
				item.termin_id === image.termin_id &&  (
				<div key={idx} className="drop-shadow-md">
					<Image src={`/o/kurs/${image.obrazek}`} height="288" width="384" priority alt="" />
				</div>)
				))}
			</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

CourseItem.propTypes = {
  items: PropTypes.array.isRequired,
};

export default CourseItem;
