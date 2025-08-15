import React from 'react';
export interface Props {
	href:string;
	fill:string
}

const LinkedinIcon = ({ href, fill }: Props) => {
	return(
		<div className={`p-4 m-4 ${fill}`}>
			<a href={href}>
				<div style={{'marginTop':'4px','width':'50px','height':'50px','borderRadius':'10px','position':'relative','backgroundColor':fill}}>
					<span style={{'fontWeight':'bold','fontSize':'2rem','color':'#333','position':'absolute','left':'50%','top':'50%','transform':'translate(-50%,-50%)'}}>in</span>
				</div>
				</a>
		</div>
	);
};

export default LinkedinIcon;
