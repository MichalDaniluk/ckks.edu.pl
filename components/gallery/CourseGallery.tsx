import React, { useEffect, useState } from 'react';
import axios from 'axios';

import GalleryContainer from './GalleryContainer';

function CourseGallery(props) {

const [items, setItems] = useState([]);
const [error, setError] = useState(false);

useEffect(() => {

	axios.get(`/api/galleryImages/${props.pid}`)
	.then((response) => {
		setItems(response.data);
	})
	.catch((err) => {
		setError(err.message);
	});

},[]);

  return (
	<>
		{error && <p>{error}</p>}
		{items && <GalleryContainer items={items} />}
	</>
  );
}

export default CourseGallery;
