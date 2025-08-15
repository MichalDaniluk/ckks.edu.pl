import React from 'react';
import Image from "next/legacy/image";

export interface Props {
	alt:string;
	href:string;
	image:string;
	cl:string;
}

const SocialIcon = ({ alt, href, image, cl }: Props) => {

	return(
		<div className={cl}>
			<a href={href}>
			<Image
				src={image}
				width={50}
				height={50}
				alt={alt}
			/>
			</a>
		</div>
	);
};

export default SocialIcon;
