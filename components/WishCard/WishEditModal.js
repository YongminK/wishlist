import React, {useState} from "react";
import CustomModal from "components/modal/CustomModal";
import {Box, Grid, ListItem, Select, Typography} from "@material-ui/core";
import ControlTextInput from "components/inputs/ControlTextInput";
import {useForm} from "react-hook-form";
import WantRange from "components/WishCard/WantRange";

const WishEditModal = ({onClose, open}) => {
    const {handleSubmit, control, formState: {errors}} = useForm()
    const [degreeState, setDegreeState] = useState('NOTSTATED')
    const content =
        <form>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ControlTextInput control={control} errors={errors} helperText={"Обязательное поле"} label={"Название"} rules={{required: true}} name={"title"}/>
                </Grid>
                <Grid item xs={12}>
                    <ControlTextInput
                        control={control}
                        label={"Подробнее"}
                        name={'about'}
                        multiline
                        rows={4}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"body2"}>Степень желания:</Typography>
                    <Box ml={-1.5}>
                        <WantRange degree={degreeState} isButtonsActive {...{setDegreeState}}/>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Select variant={"outlined"} fullWidth defaultValue={'ALL'} name={"accessLevel"} label={"Кому видно желание"}>
                        <ListItem value={'ALL'}>Все</ListItem>
                        <ListItem value={'FRIENDS'}>Друзья</ListItem>
                        <ListItem value={'NOBODY'}>Никто</ListItem>
                    </Select>
                </Grid>
            </Grid>
    </form>

    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <CustomModal
            header={"Редактировать желание"}
            content={content}
            onClose={onClose}
            onSubmit={handleSubmit(onSubmit)}
            open={open}
        />
    )
}

export default WishEditModal
