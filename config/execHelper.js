import cookie, {serialize} from "cookie";
import cookies from "js-cookie";

export const EXEC_SSR = "ssr"; //рендеринг на сервере
export const EXEC_NO_SSR_SKIP = "no_ssr_skip"; //рендеринг не на сервере, но происходит проход через регидрацию (пропустить)
export const EXEC_NO_SSR = "no_ssr" //рендеринг на клиенте

export const getExecType = (ctx) => {
    return (!!ctx && !!(ctx.req)) ? EXEC_SSR : (typeof window !== "undefined" ? EXEC_NO_SSR : EXEC_NO_SSR_SKIP);
}

export const getAccessToken = (execType, ctx) => {
    if (ctx?.accessToken) return ctx.accessToken;
    if (execType === EXEC_SSR) {
        return cookie.parse(ctx.req.headers?.cookie || "").accessToken
    } else if (execType === EXEC_NO_SSR) {
        return cookies.get('accessToken');
    }
}

export const getRefreshToken = () => {
    return {
        refreshToken: cookie.get('refreshToken'),
        token: cookie.get('token')
    }
}

export const setCookies = (execType, ctx, _cookies) => {
    if (execType === EXEC_SSR) {
        ctx.res.setHeader('Set-Cookie', _cookies.map(_cookie => serialize(_cookie.name, _cookie.value, _cookie.options)));
    } else if (execType === EXEC_NO_SSR) {
        for (const _cookie of _cookies) {
            cookies.set(_cookie.name, _cookie.value, _cookie.options);
        }
    }
}

export const removeCookies = (execType, ctx, _cookies) => {
    if (execType === EXEC_SSR) {
        ctx.res.setHeader('Set-Cookie', _cookies.map(_cookie => serialize(_cookie, '', {expires: new Date(Date.now() - 10000)})));
    } else if (execType === EXEC_NO_SSR_SKIP) {
        for (const _cookie of _cookies) {
            cookies.remove(_cookie);
        }
    }
}
