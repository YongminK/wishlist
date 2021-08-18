import React from "react";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    secondaryButton: {
        color: 'white'
    }
}))

const DefaultModalButtons = ({onClose, onSubmit, submitText = 'Сохранить'}) => {
    const classes = useStyles()
    return (
        <>
            <Button onClick={onClose}>Закрыть</Button>
            <Button variant={"contained"} onClick={onSubmit} classes={{containedSecondary: classes.secondaryButton}}
                    color={"secondary"}>{submitText}</Button>
        </>
    )
}
export default DefaultModalButtons
