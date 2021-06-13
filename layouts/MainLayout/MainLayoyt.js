import Header from "./Header";
import Page from "components/Page";

const MainLayout = ({children, title}) => {
	return (
		<Page title={title}>
			<Header/>
			{children}
		</Page>

	)
}

export default MainLayout
