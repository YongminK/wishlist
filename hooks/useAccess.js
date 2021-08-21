import React, {useEffect, useState} from "react"
import {useQuery} from "@apollo/client";
import {GET_ME} from "graphql/me/getMe";
import {useRouter} from "next/router";
import getIDfromBase64 from "misc/func/getIDfromBase64";

export const useAccess = () => {
    const [myId, setMyId] = useState('')
    const [isMe, setIsMe] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const router = useRouter()
    const {query} = router

    const {data} = useQuery(GET_ME);
    const define = (values, id) => {
        setMyId(id)
        if (router.route === '/user')
            setIsMe(query?.id === getIDfromBase64(id))
        setIsLoaded(true)
    }
    
    useEffect(() => {
        if (data?.me) {
            // console.log(data?.me)
            define(data.me.attributes, data.me.id);
        }
    }, [data])

    return {isLoaded, define, myId, isMe}
}

export const Show = ({show, children, text = "Нет доступа", style = {fontSize: 20, textAlign: "center"}}) => {
    if (show) return <>{children}</>
    return <div style={style}>{text}</div>
}
