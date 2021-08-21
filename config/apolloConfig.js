import {ApolloClient, ApolloLink, InMemoryCache, Observable} from '@apollo/client';
import {onError} from "@apollo/client/link/error";
import fetch from "node-fetch";
import {withApollo as withApolloHOC} from "next-apollo";
import {getAccessToken, getExecType, getRefreshToken, removeCookies, setCookies} from "./execHelper";
import moment from "moment";
import {BASE_GRAPHQL_URL} from "config";
import {createUploadLink} from "apollo-upload-client";

let isRefreshing = false;
let failedRequestsQueue = [];

const httpLink = createUploadLink({
    fetch,
    uri: BASE_GRAPHQL_URL,
});

const processQueue = async (error, token = null) => {
    failedRequestsQueue.forEach(prom => error ? prom.reject(error) : prom.resolve(token));
    failedRequestsQueue = [];
    isRefreshing = false;
};


const refreshAccessToken = async (execType, ctx) => {
    const {refreshToken, token} = getRefreshToken()
    console.log(refreshToken, token)
    const r = await fetch(BASE_GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': "JWT " + getAccessToken(execType, ctx),
        },
        body: JSON.stringify({
            query: `mutation refreshTokens {refreshTokens(refreshToken: "${refreshToken}", token: "${token}") {ok accessToken refreshToken message}}`
        })
    });
    return await r.json();
}
const createClient = (ctx) => {
    const execType = getExecType(ctx);

    const authMiddleware = new ApolloLink((operation, forward) => {
        const token = getAccessToken(execType, ctx);
        operation.setContext({headers: {authorization: token ? 'JWT ' + token : null}});
        return forward(operation);
    });

    return new ApolloClient({
        link: ApolloLink.from([
            onError(({graphQLErrors, networkError, operation, forward}) => {
                if (graphQLErrors)
                    graphQLErrors.forEach(({message, locations, path}) =>
                        console.log(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                        ),
                    );
                if (networkError) console.log(`[Network error]: ${networkError}`);
                if (!graphQLErrors) return;
                if (graphQLErrors.find(({message}) => message === "Signature has expired. Authorize again or refresh access_token!")) {
                    console.log("glq error on", execType);
                    console.log("isRefreshing", isRefreshing);
                    return new Observable(async observer => {
                        //Кладем запрос в очередь отклоненных запросов, там он будет ждать решения по обновлению токена
                        new Promise((resolve, reject) => {
                            failedRequestsQueue.push({resolve, reject});
                        }).then(accessToken => {
                            //Если все ок, то идем дальше, пуская вперед остальные запросы;
                            const subscriber = {
                                next: observer.next.bind(observer),
                                    error: observer.error.bind(observer),
                                    complete: observer.complete.bind(observer)
                                };
                                if (ctx) ctx.accessToken = accessToken;
                                forward(operation).subscribe(subscriber)
                            }).catch((e) => {
                                //Refresh-токен тоже просрочен, редирект на авторизацию произведет первый запрос в очереди отклоненных
                                console.log("Unable to refresh token, redirecting to auth:", e)
                            });
                            console.log("check");
                            //Если данный запрос первый в очереди отклоненных, то есть до него никто не поставил isRefreshing
                            if (!isRefreshing) {
                                isRefreshing = true;
                                console.log("isRefreshing", isRefreshing);
                                try {
                                    console.log("before redirect");
                                    //Идем вручную на рефреш токена, ибо клиент Apollo испорчен старым токеном до момента обновления
                                    const data = await refreshAccessToken(execType, ctx);

                                    //Если токен не получилось обновить, идем на авторизацию
                                    if (data.errors?.length) {
                                        throw new Error("Error refreshing token");
                                    }
                                    console.log("done refreshing " + execType);
                                    //Если все ок, обновляем токен
                                    const {data: {refreshToken: {token, refreshToken}}} = data;
                                    setCookies(execType, ctx, [
                                        {
                                            name: 'accessToken',
                                            value: token,
                                            options: {expires: moment().add(30, "days").toDate()}
                                        },
                                        {
                                            name: 'refreshToken',
                                            value: refreshToken,
                                            options: {expires: moment().add(30, "days").toDate()}
                                        },
                                    ]);
                                    console.log(data);
                                    //Запускаем очередь отклоненных запросов с новым токеном
                                    await processQueue(null, token);
                                } catch (e) {
                                    console.log("redirect");
                                    await processQueue(e, null);
                                    //Аналогично ошибкам GQL, если не достучались до сервера вообще, идем на авторизацию
                                    removeCookies(execType, ctx, ['accessToken', 'refreshToken']);
                                }
                            }
                        }
                    );
                }
            }),
            authMiddleware,
            httpLink
        ]),
        cache: new InMemoryCache(),
    })
};

export const withApollo = withApolloHOC(createClient);
