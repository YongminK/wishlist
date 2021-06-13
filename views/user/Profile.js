import React, {useState} from "react";
import {Avatar, Box, Card, CardContent, colors, Grid, LinearProgress} from "@material-ui/core";
import {useRouter} from "next/router";
import {makeStyles} from "@material-ui/core/styles";
import getInitials from "misc/func/getinitials";
import formatDate from "misc/func/formatDate";
import timeSince from "misc/func/timeSince";
import {useQuery} from "@apollo/client";
import {GET_USER} from "graphql/user/query/getUser";
import {useAccess} from "hooks/useAccess";
import {Edit} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import EditUserModal from "views/user/components/EditUserModal";

const useStyles = makeStyles((theme) => ({
    progress: {
        width: '50vw'
    },
    container: {
        width: '100%',
        '& > div': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
            }
        }
    },
    avatar: {
        width: 100,
        height: 100,
        marginRight: theme.spacing(2),
        '& > img': {
            width: 100,
            height: 100,
            borderRadius: '50%'
        },
        '& > .MuiAvatar-root': {
            width: 100,
            height: 100,
            fontSize: '4.5rem',
            backgroundColor: colors.blueGrey[500]
        }
    },
    nickname: {
        fontWeight: 600,
        fontSize: 24,
        display: 'flex',
        alignItems: 'center',
        textTransform: 'uppercase',
        '& > span': {
            fontSize: 14,
            fontWeight: 400,
            marginLeft: theme.spacing(2)
        }
    },
    about: {
        maxWidth: 400,
        marginTop: theme.spacing(1)
    },
    lastSeen: {
        fontSize: 14,
        color: colors.grey[400],
        fontStyle: 'italic',
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
            marginTop: theme.spacing(1)
        }
    }
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

    const {isCurrentUser, isLoaded} = useAccess();
    const renderEditModal = <EditUserModal open={openModal} onClose={() => setOpenModal(false)} currentData={data?.user}/>

    return (
        <Box height={'100%'}>
            {loading || error || !isLoaded  ?
                <Box height={'100%'} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <LinearProgress className={classes.progress}/>
                </Box> :
                <Grid container spacing={3}>
                    <Grid xs={12} item>
                        <Card>
                            <CardContent>
                                <Box display={'flex'} width={'100%'}>
                                    <div className={classes.avatar}>
                                        {data?.user?.userpic ? <img src={data?.user?.userpic}/> :
                                            <Avatar>{getInitials(data?.user?.userName || '')}</Avatar>}
                                    </div>
                                    <div className={classes.container}>
                                        <div>
                                            <div className={classes.nickname}>
                                                {data?.user?.nickname}
                                                {data?.user?.birthday &&
                                                <span>
                                                    {`${formatDate(data?.user?.birthday)} (${timeSince(data?.user?.birthday)})`}
                                                </span>}
                                                {isCurrentUser(data?.user.id) &&
                                                <IconButton onClick={() => setOpenModal(true)}>
                                                    <Edit/>
                                                </IconButton>}
                                            </div>
                                            <div>
                                                {data?.user?.lastSeen &&
                                                <p className={classes.lastSeen}>
                                                    Был онлайн: {formatDate(data.user.lastSeen, 'DD.MM.YYYY HH:mm')}
                                                </p>}
                                            </div>
                                        </div>
                                        {data?.user?.about &&
                                        <p className={classes.about}>
                                            {data.user.about}
                                        </p>}

                                    </div>

                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={12} item>
                        <Card>
                            <CardContent>

                            </CardContent>
                        </Card>
                    </Grid>
                    {renderEditModal}
                </Grid>}
        </Box>
    )
}

export default UserProfile
