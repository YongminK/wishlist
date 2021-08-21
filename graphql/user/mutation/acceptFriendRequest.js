import {gql} from "@apollo/client";

export const ACCEPT_FRIEND_REQUEST = gql `
    mutation acceptFriendRequest($fromUserId: ID!) {
        acceptFriendRequest(fromUserId: $fromUserId) {
            message
            ok
        }
    }
`
