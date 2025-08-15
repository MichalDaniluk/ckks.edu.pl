import React from 'react';

import GalleryItem from '../gallery/GalleryItem';

const GalleryContainerAll = ({ items = [] }) => {
  const galleryItems = Array.isArray(items) ? items : [];
  
  if (!galleryItems || galleryItems.length === 0) {
    return <p>Brak zdjęć</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-4 grid-rows-1">
      {galleryItems.map((item, index) => (
        <GalleryItem key={index} item={item} />
      ))}
    </div>
  );
};

export default GalleryContainerAll;
