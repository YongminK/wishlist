import React, {forwardRef, useCallback, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import PropTypes from 'prop-types';
import track from 'misc/analytics'
import {useRouter} from "next/router";

const Page = forwardRef(({
                             children,
                             title = '',
                             ...rest
                         }, ref) => {
    const location = useRouter();

    const sendPageViewEvent = useCallback(() => {
        track.pageview({
            page_path: location.pathname
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        sendPageViewEvent();
    }, [sendPageViewEvent]);

    return (
        <div
            ref={ref}
            {...rest}
        >
            <Helmet>
                <link rel="icon" href="/favicon.svg"/>
                <title>{title}</title>
            </Helmet>
            {children}
        </div>
    );
});

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string
};

export default Page;
