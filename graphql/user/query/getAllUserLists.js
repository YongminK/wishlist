import {gql} from "@apollo/client";

export const GET_ALL_USER_LIST = gql `
    query getAllUserLists($userId: ID!) {
        getAllUserLists(userId: $userId) {
            id
            title
        }
    }
`
