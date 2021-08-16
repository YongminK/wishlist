import React from "react";
import {Box, Tooltip} from "@material-ui/core";
import {
    SentimentSatisfied,
    SentimentSatisfiedAlt,
    SentimentVerySatisfied
} from "@material-ui/icons";

const WantRange = ({degree}) => {
    const color = 'primary'
    const degreeFill = {
        NOTWANT : [],
        WANT: [color],
        REALLYWANT: [color,color],
        NOTSTATED: [color,color,color]
    }

    return (
        <Box display={'flex'} mt={1}>
            <Tooltip title={"Хочется"}>
                <div><SentimentSatisfied color={degreeFill[degree][0]}/></div>
            </Tooltip>
            <Tooltip title={"Очень хочется"}>
                <div><SentimentSatisfiedAlt color={degreeFill[degree][1]}/></div>
            </Tooltip>
            <Tooltip title={"Очень сильно хочется"}>
                <div><SentimentVerySatisfied color={degreeFill[degree][2]}/></div>
            </Tooltip>
        </Box>
    )
}

export default WantRange
