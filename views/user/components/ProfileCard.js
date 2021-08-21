import React, {useState} from "react";
import {Avatar, Box, Card, CardContent, colors, Tooltip} from "@material-ui/core";
import getInitials from "misc/func/getinitials";
import formatDate from "misc/func/formatDate";
import timeSince from "misc/func/timeSince";
import IconButton from "@material-ui/core/IconButton";
import {Edit, PersonAdd} from "@material-ui/icons";
import {useAccess} from "hooks/useAccess";
import {makeStyles} from "@material-ui/core/styles";
import EditUserModal from "views/user/components/EditUserModal";
import {useMutation, useQuery} from "@apollo/client";
import {GET_USER} from "graphql/user/query/getUser";
import {useRouter} from "next/router";
import {SEND_FRIEND_REQUEST} from "graphql/user/mutation/sendFriendRequest";
import {Skeleton} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({

    container: {
        width: '100%',
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

const ProfileCard = () => {
    const classes = useStyles()
    const router = useRouter()
    const {id} = router.query;
    const [openEditUserModal, setOpenEditUserModal] = useState(false);
    const {isMe, isLoaded} = useAccess();

    const {data, loading, error} = useQuery(GET_USER, {
        variables: {
            userId: id
        }
    })

    const onCloseEditUserModal = () => {
        setOpenEditUserModal(false)
    }

    const renderEditUserModal = <EditUserModal currentData={data?.user} open={openEditUserModal} onClose={onCloseEditUserModal}/>
    const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST)

    const onSendFriendRequest = () => {
        sendFriendRequest({
            variables: {
                toUserId: data?.user?.id
            }
        })
    }
    return (
        <Card>
            <CardContent>
                <Box display={'flex'} width={'100%'}>
                    {loading || error ? <Skeleton variant={"circle"} height={100} width={113}/> : <div className={classes.avatar}>
                        {data?.user?.userpic ? <img src={data?.user?.userpic}/> :
                            <Avatar>{getInitials(data?.user?.userName || '')}</Avatar>}
                    </div>}
                    <div className={classes.container}>
                        <div>
                            <div className={classes.nickname}>
                                {loading || error ? <Skeleton width={100} height={30}/> : data?.user?.nickname}
                                {loading || error ? <Skeleton width={100} height={30}/> : data?.user?.birthday &&
                                <span>{`${formatDate(data?.user?.birthday)} (${timeSince(data?.user?.birthday)})`}</span>}
                                {!isLoaded || loading || error ? <Skeleton width={33} height={30} variant={"circle"}/> :
                                    isMe ?
                                    <>
                                        <Tooltip title={"Редактировать профиль"}>
                                            <IconButton onClick={() => setOpenEditUserModal(true)}>
                                                <Edit/>
                                            </IconButton>
                                        </Tooltip>
                                        {renderEditUserModal}
                                    </> :
                                    <Tooltip title={"Добавить в друзья"} onClick={onSendFriendRequest}>
                                        <IconButton>
                                            <PersonAdd/>
                                        </IconButton>
                                    </Tooltip>
                              }
                            </div>
                            <div>
                                {data?.user?.lastSeen &&
                                <p className={classes.lastSeen}>
                                    Был онлайн: {formatDate(data?.user.lastSeen, 'DD.MM.YYYY HH:mm')}
                                </p>}
                            </div>
                        </div>
                        {loading || error ?
                            <Box display={"flex"} maxWidth={400} flexWrap={'wrap'} ml={2} justifyContent={'space-between'} mt={1}>
                                <Skeleton width={50}/> <Skeleton width={200}/>
                                <Skeleton width={80}/> <Skeleton width={20}/> <Skeleton width={60}/>
                                <Skeleton width={50}/> <Skeleton width={200}/><Skeleton width={80}/>
                            </Box> :
                            data?.user?.about &&
                        <p className={classes.about}>
                            {data?.user.about}
                        </p>}
                    </div>

                </Box>
            </CardContent>
        </Card>
    )
}

export default ProfileCard
