import React from "react";
import {Avatar, Box, Card, CardContent, colors, Grid, LinearProgress} from "@material-ui/core";
import {useRouter} from "next/router";
import {makeStyles} from "@material-ui/core/styles";
import getInitials from "misc/func/getinitials";
import formatDate from "misc/func/formatDate";
import timeSince from "misc/func/timeSince";

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
            [theme.breakpoints.down('sm')]: {
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
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginTop: theme.spacing(1)
        }
    }
}))

const UserProfile = () => {
    const classes = useStyles()
    const router = useRouter()
    const {id} = router.query;
    // const {data, loading, error} = useQuery(GET_USER)
    const loading = false, error = false, data = {
        user: {
            about: "Люблю собак, голубой, кофе. Аллергия на шоколад",
            birthday: '1997-01-09',
            userName: "test",
            nickname: "test-nick",
            lastSeen: '2021-06-13T12:15:00Z',
            userpic: '/tea.jpg'
        }
    }
    return (
        <Box height={'100%'}>
            {loading || error ?
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
                                            <p className={classes.nickname}>
                                                {data?.user?.nickname}
                                                {data?.user?.birthday &&
                                                <span>
                                                    {`${formatDate(data?.user?.birthday)} (${timeSince(data?.user?.birthday)})`}
                                                </span>}
                                            </p>
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
                </Grid>}
        </Box>
    )
}

export default UserProfile
