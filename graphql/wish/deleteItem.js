import {gql} from "@apollo/client";

export const DELETE_ITEM = gql `
    mutation deleteItem($itemId: ID) {
        deleteItem(itemId: $itemId) {
            message
            ok
        }
    }
`
