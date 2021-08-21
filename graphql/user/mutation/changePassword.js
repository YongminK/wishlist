import {gql} from "@apollo/client";

export const CHANGE_PASSWORD = gql `
    mutation changePassword($email: String!, $newPassword: String!, $oldPassword: String!) {
        changePassword(email: $email, newPassword: $newPassword, oldPassword: $oldPassword) {
            message
            ok
        }
    }
`
