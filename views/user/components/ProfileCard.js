import React, {useState} from "react";
import {Avatar, Box, Card, CardContent, colors} from "@material-ui/core";
import getInitials from "misc/func/getinitials";
import formatDate from "misc/func/formatDate";
import timeSince from "misc/func/timeSince";
import IconButton from "@material-ui/core/IconButton";
import {Edit} from "@material-ui/icons";
import {useAccess} from "hooks/useAccess";
import {makeStyles} from "@material-ui/core/styles";
import EditUserModal from "views/user/components/EditUserModal";

const useStyles = makeStyles((theme) => ({

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

const ProfileCard = ({userData}) => {
    const classes = useStyles()
    const [openEditUserModal, setOpenEditUserModal] = useState(false);
    const {isCurrentUser} = useAccess();
    const onCloseEditUserModal = () => {
        setOpenEditUserModal(false)
    }
    const renderEditUserModal = <EditUserModal currentData={userData} open={openEditUserModal} onClose={onCloseEditUserModal}/>

    return (
        <Card>
            <CardContent>
                <Box display={'flex'} width={'100%'}>
                    <div className={classes.avatar}>
                        {userData?.userpic ? <img src={userData?.userpic}/> :
                            <Avatar>{getInitials(userData?.userName || '')}</Avatar>}
                    </div>
                    <div className={classes.container}>
                        <div>
                            <div className={classes.nickname}>
                                {userData?.nickname}
                                {userData?.birthday &&
                                <span>
                                                    {`${formatDate(userData?.birthday)} (${timeSince(userData?.birthday)})`}
                                                </span>}
                                {!isCurrentUser(userData?.id) &&
                                    <>
                                        <IconButton onClick={() => setOpenEditUserModal(true)}>
                                            <Edit/>
                                        </IconButton>
                                        {renderEditUserModal}
                                    </>
                              }
                            </div>
                            <div>
                                {userData?.lastSeen &&
                                <p className={classes.lastSeen}>
                                    Был онлайн: {formatDate(userData.lastSeen, 'DD.MM.YYYY HH:mm')}
                                </p>}
                            </div>
                        </div>
                        {userData?.about &&
                        <p className={classes.about}>
                            {userData.about}
                        </p>}
                    </div>

                </Box>
            </CardContent>
        </Card>
    )
}

export default ProfileCard
