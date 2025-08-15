import React from 'react';

const Page = ({body}) => {
  return (
    <div className="w-3/4 m-auto">
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
};

export default Page;
