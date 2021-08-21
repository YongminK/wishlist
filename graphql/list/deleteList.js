import {gql} from "@apollo/client";

export const DELETE_LIST = gql `
    mutation deleteList($listId: ID, $withItems: Boolean) {
        deleteList(listId: $listId, withItems: $withItems) {
            message
            ok
        }
    }
`
