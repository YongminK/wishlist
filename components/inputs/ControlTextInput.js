import {TextField} from "@material-ui/core";
import {Controller} from "react-hook-form";
import React from "react";
import * as PropTypes from "prop-types";

const ControlTextInput = ({label, name, defaultValue = "", type = "text", control, errors, helperText, size="small", ...rest}) => {
    return (
        <Controller
            render={({field}) => {
                return <TextField {...field} {...rest} size={size} multiline={rest.multiline} rows={rest.rows} variant={"outlined"} fullWidth label={label} type={type} error={errors && errors[name]} helperText={errors && errors[name] && helperText}/>
            }}
            name={name}
            defaultValue={defaultValue}
            control={control}
            {...rest}
        />
    )
}

ControlTextInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
};
ControlTextInput.defaultProps = {
    label: '',
    name: '',
    type: 'text',
}

export default ControlTextInput;
