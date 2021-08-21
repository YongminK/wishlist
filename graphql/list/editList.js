import {gql} from "@apollo/client";

export const EDIT_LIST = gql `
    mutation editList($data: ListEditInput!) {
        editList(data: $data) {
            message
            ok
        }
    }
`
