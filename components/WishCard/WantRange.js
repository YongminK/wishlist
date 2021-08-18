import React from "react";
import {Box, IconButton, Tooltip} from "@material-ui/core";
import {
    SentimentSatisfied,
    SentimentSatisfiedAlt,
    SentimentVerySatisfied
} from "@material-ui/icons";

const WantRange = ({degree, isButtonsActive = false, setDegreeState}) => {
    const color = 'primary'
    const degreeFill = {
        NOTWANT : [color],
        WANT: [color, color],
        REALLYWANT: [color,color, color],
        NOTSTATED: []
    }

    const setDegree = (newDegree) => {
        return degree === newDegree ? 'NOTSTATED' : newDegree
    }

    return (
        <Box display={'flex'}>
            <Tooltip title={"Хочется"}>
                <IconButton disabled={!isButtonsActive} onClick={() => setDegreeState(setDegree('NOTWANT'))}>
                    <SentimentSatisfied color={degreeFill[degree][0]}/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Очень хочется"}>
                <IconButton disabled={!isButtonsActive} onClick={() => setDegreeState(setDegree('WANT'))}>
                    <SentimentSatisfiedAlt color={degreeFill[degree][1]}/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Очень сильно хочется"}>
                <IconButton disabled={!isButtonsActive} onClick={() => setDegreeState(setDegree('REALLYWANT'))}>
                    <SentimentVerySatisfied color={degreeFill[degree][2]}/>
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default WantRange
