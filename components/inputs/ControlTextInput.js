import {TextField} from "@material-ui/core";
import {Controller} from "react-hook-form";
import React from "react";
import * as PropTypes from "prop-types";

const ControlTextInput = ({label, name, defaultValue = "", type = "text", control, as = TextField, errors,helperText, ...rest}) => {
    return (
        <Controller
            name={name}
            render={(props) =>
                <TextField
                    variant="outlined"
                    fullWidth
                    type={type}
                    error={errors && errors[name]}
                    disabled={rest.disabled}
                    helperText={helperText}
                    label={label}
                    {...props}/>}
            control={control}
            defaultValue={defaultValue}
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
