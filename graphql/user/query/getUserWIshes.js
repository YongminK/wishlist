import {gql} from "@apollo/client";

export const GET_USER_WISHES = gql `
    query getUserWishes($userId : ID!) {
        user(userId: $userId) {
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
                        title
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
