import React, {useEffect, useState} from "react";
import CustomModal from "components/modal/CustomModal";
import {Box, Grid, Typography} from "@material-ui/core";
import ControlTextInput from "components/inputs/ControlTextInput";
import {useForm} from "react-hook-form";
import WantRange from "components/WishCard/WantRange";
import ControlSelect from "components/inputs/ControlSelect";
import {useMutation} from "@apollo/client";
import {ADD_LIST} from "graphql/list/addList";


const WishEditModal = ({onClose, open, onSubmit}) => {
	const {handleSubmit, control, formState: {errors}, setValue} = useForm()
	const [degreeState, setDegreeState] = useState('NOTSTATED')

	useEffect(() => {
		setValue('degree', degreeState)
	}, [degreeState])

    const [addList] = useMutation(ADD_LIST)

	const content =
		<form>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<ControlTextInput control={control} errors={errors} helperText={"Обязательное поле"}
					                  label={"Название"} rules={{required: true}} name={"title"}/>
				</Grid>
				<Grid item xs={12}>
					<ControlTextInput
						control={control}
						label={"Подробнее"}
						name={'about'}
						multiline
						rows={4}
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant={"body2"}>Степень желания:</Typography>
					<Box ml={-1.5}>
						<WantRange degree={degreeState} isButtonsActive {...{setDegreeState}}/>
					</Box>
				</Grid>
				<Grid item xs={12}>
					<ControlSelect
						id="accessLevel"
						control={control}
						label={"Кому видно желание"}
						defaultValue={'ALL'}
						name={"accessLevel"}
						options={
							[{value: 'ALL', label: 'Все'},
							{value: 'FRIENDS', label: 'Друзья'},
							{value: 'NOBODY', label: 'Никто'}]
						}
					/>

				</Grid>
				<Grid item xs={12}>
                    {/*TODO заменить на autocomplete с freeSolo, где если введен список, которого нет, то запускается мутация на добавление*/}
					<ControlSelect
						id="list"
						control={control}
						label={"Список"}
						name={"list"}
						defaultValue={'none'}
						options={
							[{value: 'none', label: 'Без списка'}]
						}
					/>
				</Grid>
                <Grid item xs={12}>
                    {/*TODO Dropzone*/}
                </Grid>
			</Grid>
		</form>

	return (
		<CustomModal
			header={"Редактировать желание"}
			content={content}
			onClose={onClose}
			onSubmit={handleSubmit(onSubmit)}
			open={open}
		/>
	)
}

export default WishEditModal
