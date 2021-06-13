import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {ExitToApp} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    mobileMenu: {
        maxWidth: 400
    }
}));


const MobileMenu = ({
                        mobileMenuId,
                        isSignIn,
                        handleMobileMenuClose,
                        loading,
                        error,
                        mobileMoreAnchorEl,
                        setOpenSignInModal,
                        handleProfileMenuOpen
                    }) => {
    const classes = useStyles()
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    return (
        <Menu
            className={classes.mobileMenu}
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {!loading && !error && isSignIn &&
            <>
                <MenuItem>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon/>
                        </Badge>
                    </IconButton>
                    <p>Сообщения</p>
                </MenuItem>
                <MenuItem>
                    <IconButton aria-label="show 11 new notifications" color="inherit">
                        {isSignIn?.friendRequests?.length ?
                            <Badge badgeContent={isSignIn?.friendRequests?.length} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                            :
                            <NotificationsIcon/>}
                    </IconButton>
                    <p>Запросы на добавления в друзья</p>
                </MenuItem>
            </>
            }
            {
                !loading && !error && isSignIn ? <MenuItem onClick={handleProfileMenuOpen}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                        <p>Профиль</p>
                    </MenuItem>
                    :
                    <MenuItem onClick={() => setOpenSignInModal(true)}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <ExitToApp/>
                        </IconButton>
                        <p>Войти</p>
                    </MenuItem>
            }
        </Menu>
    )
}

export default MobileMenu
