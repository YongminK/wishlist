import React from "react"
import {Box, colors} from "@material-ui/core";
import {useMutation} from "@apollo/client";
import {RESET_PASSWORD} from "graphql/auth/resetPassword";
import ControlTextInput from "components/inputs/ControlTextInput";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    link: {
        color: colors.teal['600'],
        cursor: "pointer",
        '&:hover': {
            color: colors.orange['600'],
        },
        fontSize: 14,
        marginTop: theme.spacing(1)
    },
    header: {
        fontSize: 24,
        fontWeight: 600,
        marginBottom: theme.spacing(1)
    }
}))

const ResetPasswordForm = ({handleSubmit, control, errors, setIsSignIn, onClose}) => {
    const classes = useStyles()
    const [resetPassword] = useMutation(RESET_PASSWORD)
    const onSubmit = (data) => {
        resetPassword({
            variables: {
                email: data.email
            }
        }).then(res => {
            console.log(res)
            onClose()
        })
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ControlTextInput
                    name={"email"}
                    label={"Email"}
                    control={control}
                    errors={errors}
                    type={"email"}
                    rules={{required: true}}
                />
                <Box display={"flex"} justifyContent={"space-between"}>
                    <p className={classes.link} onClick={() => setIsSignIn('register')}>Зарегистрироваться</p>
                    <p className={classes.link} onClick={() => setIsSignIn("auth")}>Войти</p>
                </Box>
            </form>
        </>
    )
}

export default ResetPasswordForm
