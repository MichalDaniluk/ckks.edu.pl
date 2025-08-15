import React, { useState } from 'react';

type CourseImageProps = {
	image: string;
	alt: string;
};

export function CourseImage({ image, alt }: CourseImageProps) {
	const [imageSrc, setImageSrc] = useState(image);
	const [hasError, setHasError] = useState(false);

	// Default fallback image
	const fallbackImage = '/img/nie-wybrano.jpg';

	// Handle image load error
	const handleImageError = () => {
		if (!hasError) {
			setHasError(true);
			setImageSrc(fallbackImage);
		}
	};

	// Check if the image source is valid
	const isValidImage = imageSrc && imageSrc.trim() !== '' && imageSrc !== '/';

	return (
		<img 
			src={isValidImage ? imageSrc : fallbackImage}
			alt={alt}
			width={400}
			height={300}
			onError={handleImageError}
			style={{
				width: '100%',
				height: 'auto',
				objectFit: 'cover'
			}}
		/>
	);
}


export default CourseImage;
