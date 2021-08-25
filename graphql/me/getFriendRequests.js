import {gql} from "@apollo/client";

export const GET_FRIEND_REQUESTS = gql`
    query getFriendRequests {
        me {
            friendRequests {
                #    "Contains the nodes in this connection."
                edges{
                    node {
                        id
                        requestFromUserInfo {
                            id
                            nickname
                            userName
                            surname
                        }
                    }
                }
                #    "Pagination data for this connection."
                pageInfo {
                    #    "When paginating forwards, the cursor to continue."
                    endCursor
                    #    "When paginating forwards, are there more items?"
                    hasNextPage
                    #    "When paginating backwards, are there more items?"
                    hasPreviousPage
                    #    "When paginating backwards, the cursor to continue."
                    startCursor
                }
            }
        }
    }
`
