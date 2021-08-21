import {gql} from '@apollo/client'

export const SET_GIVER_ID = gql `
    mutation setGiverId ( $itemId: ID! ) {
        setGiverId(itemId: $itemId) {
            message
            ok
        }
    }
`
