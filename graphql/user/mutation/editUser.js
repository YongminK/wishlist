import {gql} from "@apollo/client";

export const EDIT_USER = gql `
    mutation editUser($data: UserEditInput!) {
        editUser(data: $data) {
            message
            ok
        }
    }
    
`
