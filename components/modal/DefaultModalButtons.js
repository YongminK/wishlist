import React from "react";
import {Button} from "@material-ui/core";

const DefaultModalButtons = ({onClose, onSubmit, submitText = 'Сохранить'}) => {
    return (
        <>
            <Button onClick={onClose}>Закрыть</Button>
            <Button variant={"contained"} onClick={onSubmit}
                    color={"secondary"}>{submitText}</Button>
        </>
    )
}
export default DefaultModalButtons
