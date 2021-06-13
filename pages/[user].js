import React from "react";
import MainLayoyt from "layouts/MainLayout/MainLayoyt";
import {useQuery} from "@apollo/client";
import {GET_USER_NAME} from "graphql/user/getUserName";
import UserProfile from "views/user/Profile";
import {withApollo} from "config/apolloConfig";

const UserPage = () => {
    // const loading = false, error = false, data = {
    //     user: {userName: 'test'}
    // }
    const {data, loading, error} = useQuery(GET_USER_NAME)
    return (
        <MainLayoyt title={`${loading || error ? "Страница пользователя" : data.user.userName} | Профиль`}>
            <UserProfile/>
        </MainLayoyt>
    )
}

export default withApollo()(UserPage);
