import MainLayout from "../layouts/MainLayout/MainLayoyt";
import MainPage from "views/main/MainPage";
import {withApollo} from "config/apolloConfig";

function HomePage() {
	return (
		<MainLayout title={"Главная"}>
            <MainPage/>
		</MainLayout>
	)
}

export default withApollo()(HomePage)
