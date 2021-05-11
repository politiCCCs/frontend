import { ElectoratePage } from "pages/Electorate";
import { Home } from "pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "components/Header";

export const App = (): JSX.Element => {
	return (
		<Router>
			<Header />

			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/electorates">
					<ElectoratePage />
				</Route>
			</Switch>
		</Router>
	);
};
