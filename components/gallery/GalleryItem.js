import React from 'react';

import Image from 'next/legacy/image';


const GalleryItem = ({ item }) => {
  return (
    <div className="hover:scale-[1.05] border-2 border-gray-200 bg-white drop-shadow-md p-2">
      <a href={`/galeria/${item.href}`}>
        <div>
          <Image
            src={item.obrazek && item.obrazek.startsWith('http') ? item.obrazek.replace(/^https?:\/\/[^/]+/, '') : (item.obrazek && item.obrazek.startsWith('/') ? item.obrazek : `/${item.obrazek || 'placeholder.jpg'}`)}
            alt=""
            width="100"
            height="80"
            priority
            className="rounded-md"
          />
          <div>
            <h4 className="text-xl m-2">{item.nazwa}</h4>
          </div>
        </div>
      </a>
    </div>
  );
};

export default GalleryItem;
