import {Button, Grid} from "@material-ui/core";
import ControlTextInput from "components/inputs/ControlTextInput";
import React from "react";
import cookies from "js-cookie";
import {useMutation} from "@apollo/client";
import {AUTHORIZATION} from "graphql/auth/authorization";

const SignIn = ({classes, onClose, setIsSignIn, control, handleSubmit, errors}) => {
    const [authorization] = useMutation(AUTHORIZATION)

    const onSubmit = (data) => {
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

    }
    return (
        <div>
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
                        <p className={classes.forgotPassword} onClick={() => setIsSignIn("reset")}>
                            Забыли пароль?
                        </p>
                    </Grid>
                </Grid>
                <Button size={"large"} className={classes.submitButton} variant={"contained"} type={"submit"} color={"secondary"}>Войти</Button>
            </form>
            <p className={classes.notRegisterYet}>Еще не зарегистрированы?<br/> <span onClick={() => setIsSignIn('register')}>Зарегистрироваться</span></p>
        </div>
    )
}

export default SignIn
