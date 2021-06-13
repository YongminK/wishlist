import React from "react";
import {Box} from "@material-ui/core";
import Card from "components/Card";

const WishListCard = ({wishlist = []}) => {
    return (
        <Box>
            {
                wishlist.map((wish, key) => (
                    <Card {...{wish}}/>
                ))
            }
        </Box>
    )
}

export default WishListCard
