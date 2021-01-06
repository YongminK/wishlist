import Card from "../components/Card";
import {WISHLIST} from "../wishlist/wishes";
import MainLayout from "../layouts/MainLayout/MainLayoyt";

function HomePage() {
	return (
		<MainLayout>
			<div className="w-full h-full grid md:grid-cols-3 gap-0.5 sm:grid-cols-1 lg:grid-cols-4">
				{
					WISHLIST.map((wish, key) => (
						<Card
							key={`wish-${key}`}
							{...{wish}}
						/>
					))
				}
			</div>
		</MainLayout>
	)
}

export default HomePage
