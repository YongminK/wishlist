import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SignInModal from "components/modal/SignInModal";
import MobileMenu from "layouts/MainLayout/components/MobileMenu";
import DesktopMenu from "layouts/MainLayout/components/DesktopMenu"
import cookies from 'js-cookie';
import {useRouter} from "next/router";
import {useQuery} from "@apollo/client";
import {GET_ME} from "graphql/me/getMe";


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        color: 'white',
        fontWeight: 600,
        letterSpacing: 2,
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function Header() {
    const classes = useStyles();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openSignInModal, setOpenSignInModal] = useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const [isSignIn, setIsSignIn] = useState(false)

    const {loading, error, data} = useQuery(GET_ME)

    useEffect(() => {
        if (!loading && !error && !!data?.me)
            setIsSignIn(data.me)
        else if (!loading && !error && !data) setIsSignIn(false)
    }, [data?.me, loading, error])

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
        router.push('/user?id=' + isSignIn.id)
    };

    const handleLogout = () => {
        cookies.remove('accessToken', {path: ''})
        cookies.remove('refreshToken', {path: ''})
        window.location.reload()
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Мой аккаунт</MenuItem>
            <MenuItem onClick={handleLogout}>Выход</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderSigninModal = <SignInModal open={openSignInModal} onClose={() =>setOpenSignInModal(false)}/>

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h3" noWrap>
                        WishList
                    </Typography>
                    <div className={classes.grow}/>
                   <DesktopMenu {...{isSignIn, loading, error, handleProfileMenuOpen, setOpenSignInModal}}/>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderSigninModal}
            <MobileMenu {...{
                mobileMenuId,
                isSignIn,
                loading,
                error,
                mobileMoreAnchorEl,
                setMobileMoreAnchorEl,
                handleProfileMenuOpen,
                setOpenSignInModal,
                handleMobileMenuClose
            }}/>
            {renderMenu}
        </div>
    );
}
