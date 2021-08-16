import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {Card, CardContent, CardHeader, CardMedia, Tooltip} from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import { red, orange } from '@material-ui/core/colors';
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Delete, Edit} from "@material-ui/icons";
import { faGift} from '@fortawesome/free-solid-svg-icons'
import {useMutation} from "@apollo/client";
import {SET_GIVER_ID} from "graphql/setGiverId";
const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}))

const WishCard = ({wish, ...rest}) => {
    const classes = useStyles()
    const [setGiverId] = useMutation(SET_GIVER_ID)

    const setGiver = () => {
        setGiverId({
            variables: {
                itemId: wish.id
            }
        })
    }

    const isGiver = rest.myId === wish.giverId
    const isFree = wish.status === 'FREE'
    const myWishButtons = <>
        <IconButton aria-label="settings">
            <Edit />
        </IconButton>
        <IconButton>
            <Delete/>
        </IconButton>
    </>
    const othersWishButtons = <Tooltip title={isGiver ? "Отменить бронирование подарка" :  isFree ? 'Забронировать подарок' : "Уже кто-то дарит"}>
        <IconButton disabled={!isFree && !isGiver} onClick={setGiver}>
            <FontAwesomeIcon icon={faGift} color={isGiver ? orange['A200'] :  isFree ? '' : orange[200]}/>
        </IconButton>
    </Tooltip>

    const cardActions = rest.isMe ? myWishButtons : othersWishButtons

	return (
		<Card className={clsx(classes.root, rest.className)}>
           <CardHeader
               action={ cardActions }
               title={wish.title}
                       subheader={wish.dateCreation && `Дата создания: ${moment(wish.dateCreation).format('DD.MM.YYYY')}`}/>
            {wish.pictures.length === 0 ? <></> : wish.pictures.length > 1 ? <Carousel>
                {
                    wish.pictures.map((item, i) =>
                        <CardMedia key={i} image={item} alt={wish.title} className={classes.media}/>)
                }
            </Carousel> : <CardMedia image={wish.pictures[0]} title={wish.title} className={classes.media}/>}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {wish.about}
                </Typography>
            </CardContent>
		</Card>
	)
}

export default WishCard
