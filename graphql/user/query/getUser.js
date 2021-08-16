import {gql} from "@apollo/client"

export const GET_USER = gql `
    query getUser($userId : ID!) {
        user(userId: $userId) {
            id
            userName
            nickname
            surname
            about
            birthday
            lastSeen
            userpic
            itemsOwner {
                pageInfo {
                    # "When paginating forwards, the cursor to continue."
                    endCursor
                    #   "When paginating forwards, are there more items?"
                    hasNextPage
                    #   "When paginating backwards, are there more items?"
                    hasPreviousPage
                    #  "When paginating backwards, the cursor to continue."
                    startCursor
                }
                edges {
                    node {
                        id
                        about
                        accessLevel
                        status
                        inWishlist {
                            id
                            accessLevel
                            title
                        }
                        dateCreation
                        degree
                        giverId
                        pictures
                    }
                }
            }
        }
    }
`
