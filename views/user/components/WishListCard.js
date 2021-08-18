import React, {useState} from "react";
import { Button, Grid} from "@material-ui/core";
import WishCard from "components/WishCard/WishCard";
import {useAccess} from "hooks/useAccess";
import WishEditModal from "components/WishCard/WishEditModal";
import {useMutation} from "@apollo/client";
import {ADD_ITEM} from "graphql/addItem";


const WishListCard = ({wishlist}) => {
	const {isMe, myId} = useAccess()
	const [isAddWishModalOpen, setIsAddWishModalOpen] = useState(false)
	const [addItem] = useMutation(ADD_ITEM)

	const handleAddWishModalClose = () => {
		setIsAddWishModalOpen(false)
	}

	const handleAddWishModalSubmit = (data) => {
		addItem({
			variables: {
				data: {
					title: data.title,
					about: data.about || undefined,
					accessLevel: data.accessLevel,
					degree: data.degree,
					listId: data.list === 'none' ? undefined : data.list
				}
			}
		}).then((res) => {
			console.log(res)
			handleAddWishModalClose()
		})
	}

	const renderAddWishModal = <WishEditModal open={isAddWishModalOpen} onClose={handleAddWishModalClose}
	                                          onSubmit={handleAddWishModalSubmit}/>

	return (
		<Grid container spacing={2}>
			{!myId &&
			<Grid item xs={12}>
				<Button variant={"contained"} onClick={() => setIsAddWishModalOpen(true)}>Добавить желание</Button>
			</Grid>}
			{
				wishlist?.edges.map((wish, key) => (
					<Grid key={`wish-${key}`} item xs={12} md={4}>
						<WishCard wish={wish.node} {...{isMe, myId}}/>
					</Grid>
				))
			}
			{isAddWishModalOpen && renderAddWishModal}
		</Grid>
	)
}

export default WishListCard
