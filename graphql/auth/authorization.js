import gql from "graphql-tag";

export const AUTHORIZATION = gql`
    mutation authorization ($email: String!, $password: String!){
        authorization (email: $email, password: $password){
            message
            ok
            refreshToken
            token
        }
    }
`
