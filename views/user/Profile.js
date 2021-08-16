import React from "react";
import {Box, Grid, LinearProgress} from "@material-ui/core";
import {useRouter} from "next/router";
import {makeStyles} from "@material-ui/core/styles";
import {useQuery} from "@apollo/client";
import {GET_USER} from "graphql/user/query/getUser";
import {useAccess} from "hooks/useAccess";
import ProfileCard from "views/user/components/ProfileCard";
import WishListCard from "views/user/components/WishListCard";

const useStyles = makeStyles(() => ({
    progress: {
        width: '50vw'
    },
}))

const UserProfile = () => {
    const classes = useStyles()
    const router = useRouter()
    const {id} = router.query;
    const {data, loading, error} = useQuery(GET_USER, {
        variables: {
            userId: id
        }
    })

    const {isLoaded} = useAccess();


    const itemsOwnerMock = {
        pageInfo: {

        },
        edges: [
            {
                node: {
                    id: 1,
                    title: "Наушники",
                    about: "Супер наушники  с супер звуком блюпуп",
                    accessLevel: "FRIEND",
                    status: 'FREE',
                    dateCreation: '2021-08-09',
                    degree: 'WANT',
                    pictures: ['https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg'],
                    giverId: 2,
                    inWishList: {
                        id: 1,
                        title: 'др',
                    }
                }
            },
            {
                node: {
                    id: 2,
                    title: "Термос",
                    about: "Супер наушники  с супер звуком блюпуп Супер наушники  с супер звуком блюпуп Супер наушники  с супер звуком блюпуп" ,
                    accessLevel: "ALL",
                    status: 'RESERVED',
                    dateCreation: '2021-08-09',
                    degree: 'REALLYWANT',
                    pictures: ['https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg'],
                    giverId: 2,
                    inWishList: {
                        id: 1,
                        title: 'др',

                    }
                }
            }
        ]
    }
    return (
        <Box height={'100%'}>
            {loading || error || !isLoaded  ?
                <Box height={'100%'} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <LinearProgress className={classes.progress}/>
                </Box> :
                <Grid container spacing={3}>
                    <Grid xs={12} item>
                        <ProfileCard userData={data?.user}/>
                    </Grid>
                    <Grid xs={12} item>
                       <WishListCard wishlist={data?.user?.itemsOwner || itemsOwnerMock}/>
                    </Grid>
                </Grid>}
        </Box>
    )
}

export default UserProfile
