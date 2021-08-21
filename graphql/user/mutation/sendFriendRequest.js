import {gql} from "@apollo/client";

export const SEND_FRIEND_REQUEST = gql `
    mutation sendFriendRequest($toUserId: ID!) {
        sendFriendRequest(toUserId: $toUserId) {
            message
            ok
        }
    }
`
