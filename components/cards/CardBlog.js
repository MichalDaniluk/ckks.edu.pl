import React from 'react';
import Image from 'next/legacy/image';
import PropTypes from 'prop-types';
import ButtonMore from '../../components/ui/button-more';
import defaultImage from '../../public/img/AdobeStock_119532476.jpeg';

const CardBlog = ({ key, item }) => {
  return (
    <div className="course-card blog-card" key={key}>
      <div className="card-image">
        <Image
          src={
            item.plik_duzy != null
              ? `https://next.ckks.pl/blog/files/${item.plik_duzy}`
              : defaultImage
          }
          alt={item.tytul}
          width={500}
          height={500}
          priority
        />
      </div>
      <div
        className="course-info"
        style={{ height: 40 + 'rem', overflow: 'hidden' }}
      >
        <h4>{item.tytul}</h4>
        <p style={{ textOverflow: 'ellipsis' }}>{item.opis}</p>
      </div>
      <ButtonMore
        url={`/blog/${encodeURIComponent(item.link)}`}
        title="więcej"
      />
    </div>
  );
};

CardBlog.propTypes = {
  key: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
};

export default CardBlog;
