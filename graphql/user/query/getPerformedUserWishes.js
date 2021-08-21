import {gql} from "@apollo/client"

export const GET_PERFORMED_USER_WISHES = gql `
    query getPerformedUserWishes($userId : ID!) {
        user(userId: $userId) {
            id
            itemsPerformed {
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
            }
        }
    }
`
