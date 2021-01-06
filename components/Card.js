import React from "react";
const Card = ({wish}) => {
	const {title, desc, link, linkDesc = "Ссылка", img, price, status, date} = wish;
	console.log(img)
	return (
		<div
			className="w-auto h-80 shadow-md rounded-md p-4 m-6">
			{img ?
				<div className="flex justify-center mb-1">
					<img
						src={img}
						alt={title}
						className="block mx-auto h-32 flex-shrink"
					/>
				</div>

			:
				<div className="mb-1 block mx-auto h-24 sm:mx-0 sm:flex-shrink-0 bg-magic-wand bg-no-repeat bg-center"/>
			}
			{link && <a href={link} target="_blank" className="text-blue-700 text-xs">{linkDesc}</a>}
			<p className="font-semibold text-lg">{title}</p>
			<p className="text-sm">{desc}</p>
		</div>
	)
}

export default Card