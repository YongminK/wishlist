import React from "react";
import {Controller} from "react-hook-form";
import {FormControl, InputLabel, ListItem, Select} from "@material-ui/core";

const ControlSelect = ({control, label, id, name, options, defaultValue}) => {
	return (
		<FormControl fullWidth>
			<InputLabel id={id}>{label}</InputLabel>
			<Controller
				render={({field}) => {
					return <Select {...field} fullWidth labelId={id}>
						{options.map((item, key) => <ListItem key={key} value={item.value}>{item.label}</ListItem>)}
					</Select>
				}}
				name={name}
				defaultValue={defaultValue}
				control={control}
			/>
		</FormControl>

	)
}

export default ControlSelect