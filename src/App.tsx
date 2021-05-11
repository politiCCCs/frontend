import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ElectoratePage } from "pages/Electorate";
import { Home } from "pages/Home";
import { Header } from "components/Header";
import { fetchLikes, fetchRetweets, fetchSentiment } from "state/twitterData";
import { fetchCandidates, fetchNames } from "state/candidates";

const useFetching = (): void => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchLikes());
		dispatch(fetchRetweets());
		dispatch(fetchSentiment());

		dispatch(fetchNames());
		dispatch(fetchCandidates());
	}, [dispatch]);
};

export const App = (): JSX.Element => {
	useFetching();

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
