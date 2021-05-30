import React from 'react';
import App from "next/app";

const ensureAuth = (WrappedComponent) => {

    const EnsureAuth = (pageProps) => {
        return <WrappedComponent {...pageProps} />;
    };

    //если рендеринг на сервере, т.к. next-apollo создает getInitialProps при ssr: true
    if (WrappedComponent.getInitialProps) {
        EnsureAuth.getInitialProps = async ctx => {

            //завершаем цикл вызовов
            const inAppContext = Boolean(ctx.ctx);

            // Run wrapped getInitialProps methods
            let pageProps = {};
            if (WrappedComponent.getInitialProps) {
                pageProps = await WrappedComponent.getInitialProps(ctx);
            } else if (inAppContext) {
                pageProps = await App.getInitialProps(ctx);
            }
            return pageProps;
        }
    }

    return EnsureAuth;
};

export default ensureAuth;

