import {gql} from "@apollo/client";

export const UPLOAD_USERPIC = gql `
    mutation uploadUserpic($userPic: Upload!) {
        uploadUserpic(userPic: $userPic) {
            message
            ok
        }
    }
`
