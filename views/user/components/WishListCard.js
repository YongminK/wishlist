import React, {useState} from "react";
import {Box, Button, Grid, LinearProgress} from "@material-ui/core";
import WishCard from "components/WishCard/WishCard";
import {useAccess} from "hooks/useAccess";
import WishEditModal from "components/WishCard/WishEditModal";
import {useMutation, useQuery} from "@apollo/client";
import {ADD_ITEM} from "graphql/wish/addItem";
import {GET_USER_WISHES} from "graphql/user/query/getUserWIshes";
import {useRouter} from "next/router";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    progress: {
        width: '50vw'
    },
}))

const WishListCard = () => {
    const classes = useStyles()
    const router = useRouter()
    const {id} = router.query
    const {isMe, myId, isLoaded} = useAccess()
    const [isAddWishModalOpen, setIsAddWishModalOpen] = useState(false)

    const [addItem] = useMutation(ADD_ITEM)

    const {data, loading, error, refetch} = useQuery(GET_USER_WISHES, {
        variables: {
            userId: id
        }
    })
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
            refetch()
            handleAddWishModalClose()
        })
    }

    const renderAddWishModal = <WishEditModal open={isAddWishModalOpen} onClose={handleAddWishModalClose}
                                              onSubmit={handleAddWishModalSubmit} />

    return (
        <>
            {loading || error || !isLoaded ?
                <Box height={'100%'} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <LinearProgress className={classes.progress}/>
                </Box> :
                <Grid container spacing={2}>
                    {isMe &&
                    <Grid item xs={12}>
                        <Button variant={"contained"}
                                onClick={() => setIsAddWishModalOpen(true)}>
                            Добавить желание
                        </Button>
                    </Grid>}
                    {
                        data?.user?.itemsOwner?.edges.map((wish, key) => (
                            <Grid key={`wish-${key}`} item xs={12} md={4}>
                                <WishCard wish={wish.node} {...{isMe, myId}}/>
                            </Grid>
                        ))
                    }
                    {isAddWishModalOpen && renderAddWishModal}
                </Grid>}
        </>
    )
}

export default WishListCard
