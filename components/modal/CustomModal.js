import React from "react";
import {Card, CardActions, CardContent, CardHeader, Modal} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DefaultModalButtons from "components/modal/DefaultModalButtons";

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
    actions: {
        display: 'flex',
        justifyContent: "flex-end"
    },
    header: {
        paddingBottom: 0
    }
}))

const CustomModal = ({open, onClose, header, buttons, content, onSubmit, submitText}) => {
    const classes = useStyles()
    return (
        <Modal open={open} onClose={onClose}>
            <Card className={classes.root}>
                {header && <CardHeader classes={{root: classes.header}} title={header}/>}
                <CardContent>
                    {content}
                </CardContent>
                <CardActions className={classes.actions}>
                    {buttons || <DefaultModalButtons {...{onClose, onSubmit, submitText}}/>}
                </CardActions>
            </Card>
        </Modal>
    )
}

export default CustomModal
