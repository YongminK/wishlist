import React from "react";
import {Button, Card, CardContent, Grid, Modal} from "@material-ui/core";
import ControlTextInput from "components/inputs/ControlTextInput";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {EDIT_USER} from "graphql/user/mutation/editUser";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
}))

const EditUserModal = ({currentData, open, onClose}) => {
    const classes = useStyles();
    const {control, handleSubmit} = useForm();
    const [editUser] = useMutation(EDIT_USER)

    const onSubmit = (data) => {
        console.log(data)
        editUser({
            variables: {
                data: {...data}
            }
        }).then(res => {
            if (res.data.editUser.ok) onClose()
        })
    }
    return (
        <Modal open={open} onClose={onClose}>
            <Card className={classes.root}>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <ControlTextInput
                                    control={control}
                                    label={"Имя"}
                                    name={"userName"}
                                    defaultValue={currentData?.userName}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ControlTextInput
                                    control={control}
                                    label={"Фамилия"}
                                    name={"surname"}
                                    defaultValue={currentData?.surname}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ControlTextInput
                                    control={control}
                                    type={"date"}
                                    label={"Дата рождения"}
                                    name={"birthday"}
                                    defaultValue={currentData?.birthday}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ControlTextInput
                                    control={control}
                                    label={"Номер телефона"}
                                    name={"phoneNumber"}
                                    defaultValue={currentData?.phoneNumber}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ControlTextInput
                                    control={control}
                                    type={"email"}
                                    label={'Email'}
                                    name={'email'}
                                    defaultValue={currentData?.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ControlTextInput
                                    control={control}
                                    label={"Никнейм"}
                                    name={"nickname"}
                                    defaultValue={currentData?.nickname}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ControlTextInput
                                    control={control}
                                    label={"О себе"}
                                    placeholder={"Можете написать свои предпочтения в еде, цветах, аллергии, размер одежды и многое другое, что бы  вы хотели, было бы учтено"}
                                    name={"about"}
                                    multiline
                                    rows={4}
                                    defaultValue={currentData?.about}
                                />
                            </Grid>
                        </Grid>
                        <Button type={"submit"} color={"secondary"}>Сохранить</Button>
                    </form>
                </CardContent>
            </Card>
        </Modal>
    )
}

export default EditUserModal
