import React from "react";
import {CardActions, CardContent, CardHeader, Modal} from "@material-ui/core";
import Card from "components/Card";
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
    actions: {
        display: 'flex',
        justifyContent: "flex-end"
    }
}))

const CustomModal = ({open, onClose, header, buttons, content}) => {
    const classes = useStyles()
    return (
        <Modal open={open} onClose={onClose}>
            <Card className={classes.root}>
                {header && <CardHeader title={header}/>}
                <CardContent>
                    {content}
                </CardContent>
                <CardActions className={classes.actions}>
                    {buttons}
                </CardActions>
            </Card>
        </Modal>
    )
}

export default CustomModal
