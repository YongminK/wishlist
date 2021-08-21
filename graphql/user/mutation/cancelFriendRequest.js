import {gql} from "@apollo/client";

export const CANCEL_FRIEND_REQUEST = gql `
    mutation cancelFriendRequest($fromUserId: ID!,$toUserId: ID!) {
        cancelFriendRequest(fromUserId: $fromUserId, toUserId: $toUserId) {
            message
            ok
        }
    }
`
