import LinkMore from '../base/LinkMore';
import React from 'react';

const StartTabsItem = ({ id, body }) => {
  return (
    <div id={id}>
      <div>
        <div dangerouslySetInnerHTML={{ __html: body }} />
        {/*{href !== '' && <LinkMore href={href} text="Więcej" />}*/}
      </div>
    </div>
  );
};
export default StartTabsItem;
