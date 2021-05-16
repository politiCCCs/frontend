import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ElectoratePage } from "pages/Electorate";
import { CorrelationPage } from "pages/Correlation";
import { Home } from "pages/Home";
import { Header } from "components/Header";
import {
	fetchLikes,
	fetchRetweets,
	fetchSentiment,
	fetchCount,
} from "state/twitterData";
import { fetchCandidates, fetchNames } from "state/candidates";
import { fetchPartySentiment } from "state/global";

const useFetching = (): void => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCount());
		dispatch(fetchLikes());
		dispatch(fetchRetweets());
		dispatch(fetchSentiment());

		dispatch(fetchNames());
		dispatch(fetchCandidates());

		dispatch(fetchPartySentiment());
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
				<Route exact path="/correlations">
					<CorrelationPage />
				</Route>
			</Switch>
		</Router>
	);
};
