import React, {useState} from "react";
import {Button, Card, colors, Grid, makeStyles, Modal, Typography} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {CLASSIC_REGISTER} from "graphql/auth/classicRegister";
import ControlTextInput from "components/inputs/ControlTextInput";
import {AUTHORIZATION} from "graphql/auth/authorization";
import cookies from 'js-cookie'

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

const SignInModal = ({open, onClose}) => {
    const classes = useStyles()
    const [isSignIn, setIsSignIn] = useState(true)
    const {control, handleSubmit, setError, formState: {errors}} = useForm()
    const [classicRegister] = useMutation(CLASSIC_REGISTER)
    const [authorization] = useMutation(AUTHORIZATION)

    const onSubmit = (data) => {
        console.log(data)
        if (isSignIn) {
            authorization({
                variables: {
                    email: data.email,
                    password:data.password
                }
            }).then(res => {
                console.log(res)
                if(res.data.authorization.ok) {
                    cookies.set('accessToken', res.data.authorization.token)
                    cookies.set('refreshToken', res.data.authorization.refreshToken)
                    window.location.reload()
                    onClose()
                }

            })
        } else {
            classicRegister({
                variables: {
                    userData: {
                        ...data
                    }
                }
            }).then(res => {
                if(res.data.classicRegister.ok) {
                    onClose()
                } else {
                    setError('email', {message: res.data.classicRegister.message})
                }
                console.log(res)
                onClose()
            })
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
                                label="Email"
                                name="email"
                                type={"email"}
                                control={control}
                                errors={errors}
                                rules={{required: true}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ControlTextInput
                                label="Пароль"
                                name="password"
                                type={"password"}
                                control={control}
                                rules={{required: true}}
                            />
                            <p className={classes.forgotPassword}>
                                Забыли пароль?
                            </p>
                        </Grid>
                    </Grid>
                    <Button size={"large"} className={classes.submitButton} variant={"contained"} type={"submit"} color={"secondary"}>Войти</Button>
                </form>
                <p className={classes.notRegisterYet}>Еще не зарегистрированы?<br/> <span onClick={() => setIsSignIn(false)}>Зарегистрироваться</span></p>
            </div>
        )
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Card className={classes.root}>
                {
                    isSignIn ? <SignIn/> :   <div>
                        <Typography className={classes.header}>Регистрация</Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ControlTextInput
                                        label="Email"
                                        name="email"
                                        type={"email"}
                                        control={control}
                                        rules={{required: true}}
                                        errors={errors}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ControlTextInput
                                        label="Пароль"
                                        name="password"
                                        type={"password"}
                                        control={control}
                                        rules={{required: true}}
                                        errors={errors}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ControlTextInput
                                        label="Имя пользователя"
                                        name="userName"
                                        type={"text"}
                                        control={control}
                                        rules={{required: true}}
                                        errors={errors}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ControlTextInput
                                        label="Ник пользователя"
                                        name="nickname"
                                        type={"text"}
                                        control={control}
                                        rules={{required: true}}
                                        errors={errors}
                                    />
                                </Grid>
                            </Grid>
                            <Button size={"large"} className={classes.submitButton} variant={"contained"} type="submit" color={"secondary"}>Зарегистрироваться</Button>
                        </form>
                        <p className={classes.notRegisterYet}>Уже зарегистрированы?<br/> <span onClick={() => setIsSignIn(true)}>Войти</span></p>
                    </div>
                }
            </Card>
        </Modal>
    )
}

export default SignInModal
