import React, {useState} from "react";
import {Box, Grid, LinearProgress} from "@material-ui/core";
import {useRouter} from "next/router";
import {makeStyles} from "@material-ui/core/styles";
import {useQuery} from "@apollo/client";
import {GET_USER} from "graphql/user/query/getUser";
import {useAccess} from "hooks/useAccess";
import EditUserModal from "views/user/components/EditUserModal";
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
    const [openModal, setOpenModal] = useState(false)
    const {data, loading, error} = useQuery(GET_USER, {
        variables: {
            userId: id
        }
    })

    const {isLoaded} = useAccess();
    const renderEditModal = <EditUserModal open={openModal} onClose={() => setOpenModal(false)} currentData={data?.user}/>

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
                       <WishListCard wishlist={data?.user?.itemsOwner}/>
                    </Grid>
                    {openModal && renderEditModal}
                </Grid>}
        </Box>
    )
}

export default UserProfile
