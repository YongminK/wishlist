import React from "react";
const Card = ({wish}) => {
	const {title, desc, link, img, price, status, date} = wish;
	console.log(img)
	return (
		<div
			className="w-60 h-80 shadow-md rounded-md p-6 m-6">
			{img ?
				<img
					src={img}
					alt={title}
				/>

			:
				<div className="block mx-auto h-24 sm:mx-0 sm:flex-shrink-0 bg-magic-wand bg-no-repeat bg-center"/>
			}
			<p>{title}</p>
			<p>{desc}</p>
		</div>
	)
}

export default Card