import { Map } from "components/Map";
import { Home } from "pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const App = (): JSX.Element => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/map">
					<Map />
				</Route>
			</Switch>
		</Router>
	);
};
