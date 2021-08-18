import React from "react";
import {Grid} from "@material-ui/core";
import WishCard from "components/WishCard/WishCard";
import {makeStyles} from "@material-ui/core/styles";
import {useAccess} from "hooks/useAccess";

const useStyles = makeStyles(theme => ({}))

const WishListCard = ({wishlist}) => {
    const classes = useStyles()
    const {isMe, myId} = useAccess()
    return (
        <Grid container spacing={2}>
            {
                wishlist?.edges.map((wish, key) => (
                    <Grid item xs={12} md={4}>
                        <WishCard wish={wish.node} {...{isMe, myId}}/>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default WishListCard
