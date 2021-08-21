import WishListCard from "views/user/components/WishListCard";
import PerformedWishList from "views/user/components/PeformedWishList";

const USER_TABS = [
    {
        label: "Желания",
        component: <WishListCard/>
    },
    {
        label: "Исполненные",
        component: <PerformedWishList/>
    }
]

export default USER_TABS
