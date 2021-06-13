import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import {Tooltip} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {ExitToApp} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));

const DesktopMenu = ({isSignIn, loading, error, handleProfileMenuOpen, setOpenSignInModal}) => {
    const classes = useStyles()
    return (
        <div className={classes.sectionDesktop}>
            {!loading && !error && isSignIn && <>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                    {isSignIn.friendRequests?.length ?
                        <Tooltip title={"Запросы на добавления в друзья"}>
                            <Badge badgeContent={isSignIn?.friendRequests?.length} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </Tooltip> :
                        <NotificationsIcon/>}
                </IconButton>
            </>
            }
            {!loading && !error && isSignIn ? <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                :
                <IconButton
                    edge="end"
                    aria-label="sign in"
                    aria-haspopup="true"
                    onClick={() => setOpenSignInModal(true)}
                    color="inherit"
                >
                    <ExitToApp/>
                </IconButton>
            }
        </div>
    )
}

export default DesktopMenu
