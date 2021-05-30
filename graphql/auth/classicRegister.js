import gql from "graphql-tag";

export const CLASSIC_REGISTER = gql`
    mutation classicRegister ($userData: UserInputRegistration!){
        classicRegister (userData: $userData){
            ok
            message
            ID
        }
    }
`
