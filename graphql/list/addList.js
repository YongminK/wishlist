import {gql} from "@apollo/client";

export const ADD_LIST = gql `
    mutation addList($data: ListAddInput!) {
        addList(data: $data) {
            message
            ok
        }
    }
`
