import React from 'react';
import {IPageTop} from '@interfaces/Common';

const PageTop = ({title,bgImage,hideTitle}:IPageTop) => {

  return (
    <div className="page-header mt-2">
      <div className="page-header-bg">
        {bgImage && (
          <img
            className="page-header-bg-img"
            src={bgImage}
			alt=""
			width="100"
			height="40"
          />
        )}
      </div>
      {!hideTitle && (
        <div className="text-2xl">{title && <h1>{title}</h1>}</div>
      )}
    </div>
  );
};

export default PageTop;
