import {gql} from "@apollo/client";

export const GET_USER_NAME = gql `
    query getUserName($userId: ID!) {
        user(userId: $userId) {
            id
            nickname
        }
    }
`
