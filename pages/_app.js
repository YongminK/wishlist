import React from 'react'
import {ThemeProvider} from '@material-ui/styles';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {createTheme} from "theme";
import App from 'next/app'
import 'assets/css/index.scss';
import useSettings from "hooks/useSettings";
function MyApp({Component, pageProps}) {
	const {settings} = useSettings();

	const theme = createTheme({
		direction: settings.direction,
		responsiveFontSizes: settings.responsiveFontSizes,
		theme: settings.theme
	});
	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);
	return (
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
	)
}
MyApp.getInitialProps = async (appContext) => {
	const appProps = await App.getInitialProps(appContext)
	return {...appProps}
}

export default MyApp
