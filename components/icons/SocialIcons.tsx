import React from 'react';
import FacebookIcon from '@components/icons/FacebookIcon';
import InstagramIcon from '@components/icons/InstagramIcon';
import YouTubeIcon from '@components/icons/YouTubeIcon';
import LinkedinIcon from '@components/icons/LinkedinIcon';

const SocialIcons = ({fill}) => {
	return(
		<div className="grid grid-cols-4 p-2 m-2">
			<FacebookIcon href="https://www.facebook.com/ckkspl" fill={fill}/>
			<InstagramIcon href="https://www.instagram.com/ckkspl" fill={fill}/>
			<YouTubeIcon href="https://www.youtube.com/c/CkksPl1" fill={fill}/>
			<LinkedinIcon href="https://www.linkedin.com/company/ckks-centrum-kszta%C5%82cenia-kadr-sportowych/mycompany/" fill={fill}/>
        </div>
	);
};

export default SocialIcons;

