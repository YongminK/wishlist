import Header from "./Header";
import Page from "components/Page";
import {Box} from "@material-ui/core";

const MainLayout = ({children, title, padding = 2}) => {
	return (
		<Page title={title}>
			<Header/>
            <Box p={padding} height={'calc(100vh - 64px)'}>
                {children}
            </Box>
		</Page>

	)
}

export default MainLayout
