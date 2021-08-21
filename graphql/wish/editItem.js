import {gql} from "@apollo/client";

export const EDIT_ITEM = gql `
    mutation editItem($data: ItemEditInput!) {
        editItem(data: $data) {
            message
            ok
        }
    }
`
