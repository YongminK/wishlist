import React, {useState} from "react";
import {Button, Card, Grid, makeStyles, Modal, Typography} from "@material-ui/core";
import ControlTextInput from "components/inputs/ControlTextInput";
import {useForm} from "react-hook-form";

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
        fontSize: 48,
        fontWeight: 600,
        marginBottom: theme.spacing(3)
    },
    submitButton: {
        width: "100%",
        color: "#FFF",
        marginTop: theme.spacing(3)
    }
}))

const SignInModal = ({open, onClose}) => {
    const classes = useStyles()
    const [isSignIn, setIsSignIn] = useState(true)
    const {control, handleSubmit, errors} = useForm()

    const onSubmit = (data) => {
        if (isSignIn) {

        } else {

        }
    }

    const SignIn = () => {
        return (
            <div>
                <Typography className={classes.header}>Войти</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ControlTextInput
                                label="Логин"
                                name="login"
                                control={control}
                                errors={errors}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ControlTextInput
                                label="Пароль"
                                name="password"
                                type={"password"}
                                control={control}
                            />
                            {/*TODO забыли пароль*/}
                        </Grid>
                    </Grid>
                    {/*TODO еще не зарегистрированы*/}
                    <Button size={"large"} className={classes.submitButton} variant={"contained"} type={"submit"} color={"secondary"}>Войти</Button>
                </form>
            </div>
        )
    }

    const signUp = (
        <div>
            <Typography>
                Регистрация
            </Typography>
        </div>
    )

    return (
        <Modal open={open} onClose={onClose}>
            <Card className={classes.root}>
                {
                    isSignIn ? <SignIn/> : signUp
                }
            </Card>
        </Modal>
    )
}

export default SignInModal
