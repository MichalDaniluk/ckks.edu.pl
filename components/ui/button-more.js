import React from 'react';

const ButtonMore = ({ url, title }) => {
  return (
    <a className="see-more-btn text-xl" href={url}>
      {title}
    </a>
  );
};

export default ButtonMore;
