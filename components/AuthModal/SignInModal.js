import React, {useState} from "react";
import {Box, Card, colors, makeStyles, Modal, Typography} from "@material-ui/core";
import {useForm} from "react-hook-form";
import SignIn from "components/AuthModal/SIgnIn";
import RegisterForm from "components/AuthModal/RegisterForm";
import ResetPasswordForm from "components/AuthModal/ResetPasswordForm";
import IconButton from "@material-ui/core/IconButton";
import {Close} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none',
        boxShadow: theme.shadows[20],
        width: 500,
        maxHeight: '90%',
        overflowY: 'hidden',
        maxWidth: '100%',
        padding: theme.spacing(3)
    },
    header: {
        fontWeight: 600,
    },
    submitButton: {
        width: "100%",
        color: "#FFF",
        marginTop: theme.spacing(3)
    },
    forgotPassword: {
        textAlign: "right",
        cursor: "pointer",
        marginTop: 4,
        fontSize: 14,
        '&:hover': {
            color: colors.orange['600'],
        }
    },
    notRegisterYet: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: theme.spacing(3),
        '& > span': {
            color: colors.teal['600'],
            cursor: "pointer",
            '&:hover': {
                color: colors.orange['600'],
            }
        }
    }
}))

const SignInModal = ({open, onClose, refetchGetMe}) => {
    const classes = useStyles()
    const [isSignIn, setIsSignIn] = useState('auth')
    const {control, handleSubmit, setError, formState: {errors}} = useForm()

    return (
        <Modal open={open} onClose={onClose}>
            <Card className={classes.root}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={"center"} mb={3}>
                    <Typography className={classes.header} variant={"h3"}>
                        { isSignIn === 'auth' ? "Войти" : isSignIn === 'register' ? "Регистрация" :"Восстановить пароль" }
                    </Typography>
                    <IconButton onClick={onClose}>
                        <Close/>
                    </IconButton>
                </Box>
                {
                    isSignIn === 'auth' ? <SignIn {...{classes, onClose, setIsSignIn, control, handleSubmit, errors, refetchGetMe}}/> :
                        isSignIn === 'register' ? <RegisterForm {...{classes, handleSubmit, control, errors, setIsSignIn, onClose, setError}}/> :
                            isSignIn === 'reset' && <ResetPasswordForm {...{control, errors, handleSubmit, classes, setIsSignIn, onClose}}/>
                }
            </Card>
        </Modal>
    )
}

export default SignInModal
