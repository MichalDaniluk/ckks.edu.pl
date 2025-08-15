import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { INumbers } from '@interfaces/Course';


export const IconNumbers = ({icon,info,num}:INumbers) => {
  return (
	<div className="numbers__item-content">
        <div className="numbers__item-icon">
			<FontAwesomeIcon icon={icon}/>
		</div>
        <div className="numbers__item-number">
			{num}
		</div>
		<div className="numbers__item-info" dangerouslySetInnerHTML={{ __html: info }} />
    </div>
  );
};
