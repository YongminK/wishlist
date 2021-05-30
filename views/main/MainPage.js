import React from "react";
import {makeStyles} from "@material-ui/core";
import Background from '../../public/main-page-header.jpg'
const useStyles = makeStyles(theme => ({
    header: {
        backgroundImage: `url(${Background})`,
        width: "100%",
        height: '45vh',
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: "0%"
    }
}))

const MainPage = () => {
    const classes = useStyles()
    return (
        <div>
            <div className={classes.header}>

            </div>
        </div>
    )
}

export default MainPage
