import {gql} from "@apollo/client";

export const DELETE_ITEMS_FROM_WISHLIST = gql `
    mutation deleteItemsFromWishlist($itemsId: [ID], $listId: ID) {
        deleteItemsFromWishlist(itemsId: $itemsId, listId: $listId) {
            message
            ok
        }
    }
`
