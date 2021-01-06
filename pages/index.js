import Card from "../components/Card";
import {WISHLIST} from "../wishlist/wishes";

function HomePage() {
	return (
		<div className="w-screen h-screen p-10">
			{
				WISHLIST.map((wish, key) => (
					<Card
						key={`wish-${key}`}
						{...{wish}}
					/>
				))
			}
		</div>
	)
}

export default HomePage
