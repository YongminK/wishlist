import React, {useEffect, useState} from "react"
import {useQuery} from "@apollo/client";
import {GET_ME} from "graphql/me/getMe";

export const useAccess = () => {
    const [myId, setMyId] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)

    const {data} = useQuery(GET_ME);
    const define = (values, id) => {
        setMyId(id)
        setIsLoaded(true)
    }

    const isCurrentUser = (id) => myId === id

    useEffect(() => {
        if (data?.me) {
            // console.log(data?.me)
            define(data.me.attributes, data.me.id);
        }
    }, [data])

    return {isLoaded, isCurrentUser, define, myId}
}

export const Show = ({show, children, text = "Нет доступа", style = {fontSize: 20, textAlign: "center"}}) => {
    if (show) return <>{children}</>
    return <div style={style}>{text}</div>
}
