import {Button, Grid} from "@material-ui/core";
import ControlTextInput from "components/inputs/ControlTextInput";
import React from "react";
import {useMutation} from "@apollo/client";
import {CLASSIC_REGISTER} from "graphql/auth/classicRegister";

const RegisterForm = ({classes, handleSubmit, control, errors, setIsSignIn, onClose, setError}) => {
    const [classicRegister] = useMutation(CLASSIC_REGISTER)

    const onSubmit = (data) => {
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
            <p className={classes.notRegisterYet}>Уже зарегистрированы?<br/> <span onClick={() => setIsSignIn("auth")}>Войти</span></p>
        </div>
    )
}
export default RegisterForm
