import MainLayout from "../layouts/MainLayout/MainLayoyt";
import MainPage from "views/main/MainPage";
import {withApollo} from "config/apolloConfig";

function HomePage() {
	return (
		<MainLayout title={"Главная"} padding={0}>
            <MainPage/>
		</MainLayout>
	)
}

export default withApollo()(HomePage)
