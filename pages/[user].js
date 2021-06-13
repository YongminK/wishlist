import React from "react";
import MainLayoyt from "layouts/MainLayout/MainLayoyt";
import {useQuery} from "@apollo/client";
import {GET_USER_NAME} from "graphql/user/query/getUserName";
import UserProfile from "views/user/Profile";
import {withApollo} from "config/apolloConfig";
import {useRouter} from "next/router";

const UserPage = () => {
    // const loading = false, error = false, data = {
    //     user: {userName: 'test'}
    // }
    const router = useRouter();
    const {id} = router.query;
    const {data, loading, error} = useQuery(GET_USER_NAME, {
        variables: {
            userId: id
        }
    })
    return (
        <MainLayoyt title={`${loading || error ? "Страница пользователя" : data.user.nickname} | Профиль`}>
            <UserProfile/>
        </MainLayoyt>
    )
}

export default withApollo()(UserPage);
