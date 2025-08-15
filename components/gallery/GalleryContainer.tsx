import React from 'react';
import Image from "next/legacy/image";

const GalleryContainer = ({items}) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map(image => (
        <Image
			src={`/o/kurs/${image.obrazek}`}
			height="288"
			width="384"
			priority
			key={image.obrazek}
			alt=""
        />
      ))}
    </div>
  );
};

export default GalleryContainer;
