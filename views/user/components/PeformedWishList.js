import React from "react";
import {useQuery} from "@apollo/client";
import {GET_PERFORMED_USER_WISHES} from "graphql/user/query/getPerformedUserWishes";
import {useRouter} from "next/router";
import {useAccess} from "hooks/useAccess";
import {Box, Grid, LinearProgress} from "@material-ui/core";
import WishCard from "components/WishCard/WishCard";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    progress: {
        width: '50vw'
    },
}))

const PerformedWishList = () => {
    const classes = useStyles()
    const router = useRouter()
    const {id} = router.query;
    const {isMe, isLoaded} = useAccess()
    const {data, loading, error} = useQuery(GET_PERFORMED_USER_WISHES, {
        variables: {
            userId: id
        }
    })
    return (
        <>
            {loading || error || !isLoaded ?
                <Box height={'100%'} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <LinearProgress className={classes.progress}/>
                </Box> :
                <Grid container spacing={2}>
                    {
                        data?.user?.itemsPerformed?.edges.map((wish, key) => (
                            <Grid key={`wish-${key}`} item xs={12} md={4}>
                                <WishCard wish={wish.node} isPerformed {...{isMe, myId}}/>
                            </Grid>
                        ))
                    }
                </Grid>}
        </>
    )
}

export default PerformedWishList
