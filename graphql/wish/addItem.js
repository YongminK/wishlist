import {gql} from "@apollo/client"

export const ADD_ITEM = gql `
	mutation addItem($data: ItemAddInput!) {
		addItem(data: $data) {
            ID
            message
            ok
		}
	}
`