import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {Box, Card, CardContent, CardHeader, CardMedia, Tooltip} from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import {orange, red} from '@material-ui/core/colors';
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Delete, Edit, Update} from "@material-ui/icons";
import {faGift} from '@fortawesome/free-solid-svg-icons'
import {useMutation} from "@apollo/client";
import {SET_GIVER_ID} from "graphql/wish/setGiverId";
import WantRange from "components/WishCard/WantRange";
import WishEditModal from "components/WishCard/WishEditModal";

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

const WishCard = ({wish, isPerformed = false, ...rest}) => {
    const classes = useStyles()
    const [setGiverId] = useMutation(SET_GIVER_ID)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const setGiver = () => {
        setGiverId({
            variables: {
                itemId: wish.id
            }
        })
    }

    const isGiver = rest.myId === wish.giverId
    const isFree = wish.status === 'FREE'

    const renderWishEditModal = <WishEditModal onClose={() => setIsEditModalOpen(false)} open={isEditModalOpen}/>

    const myWishButtons = <>
        <Tooltip title={"Редактировать"}>
            <IconButton aria-label="settings" onClick={() => setIsEditModalOpen(true)}>
                <Edit/>
            </IconButton>
        </Tooltip>
        <Tooltip title="Удалить">
            <IconButton>
                <Delete/>
            </IconButton>
        </Tooltip>
    </>

    const othersWishButtons =
        <Tooltip title={isGiver ? "Отменить бронирование подарка" :
            isFree ? 'Забронировать подарок' : "Уже кто-то дарит"}>
            <IconButton disabled={!isFree && !isGiver} onClick={setGiver}>
                <FontAwesomeIcon icon={faGift} color={isGiver ? orange['A200'] : isFree ? '' : orange[200]}/>
            </IconButton>
        </Tooltip>

    const performedWishButtons = <>
        <Tooltip title={"Вернуть в желаемое"}>
            <IconButton>
                <Update/>
            </IconButton>
        </Tooltip>
        <Tooltip title={"Удалить"}>
            <IconButton>
                <Delete/>
            </IconButton>
        </Tooltip>
    </>

    const cardActions = rest.isMe ?
        isPerformed ? performedWishButtons : myWishButtons :
        isPerformed ? <></> : othersWishButtons

    return (
        <Card className={clsx(classes.root, rest.className)}>
            <CardHeader
                action={cardActions}
                title={wish.title}
                subheader={wish.dateCreation && `Дата создания: ${moment(wish.dateCreation).format('DD.MM.YYYY')}`}/>
            {wish.pictures.length === 0 ? <></> : wish.pictures.length > 1 ?
                <Carousel>
                    {
                        wish.pictures.map((item, i) =>
                            <CardMedia key={i} image={item} alt={wish.title} className={classes.media}/>)
                    }
                </Carousel>
                :
                <CardMedia image={wish.pictures[0]} title={wish.title} className={classes.media}/>}
            <CardContent>
                <Box ml={-2}>
                    <WantRange degree={wish.degree}/>
                </Box>
                <Typography variant="body2" color="textSecondary" component="p">
                    {wish.about}
                </Typography>
            </CardContent>
            {isEditModalOpen && renderWishEditModal}
        </Card>
	)
}

export default WishCard
