/*
 * COMP90024 Cluster and Cloud Computing
 * Group 5
 * Aleksandar Pasquini (912504)
 * Amelia Fleischer-Boermans (389511)
 * Isaac Daly (1129173)
 * Mahardini Rizky Putri (921790)
 * Richard Yang (1215150)
 */
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ElectoratePage } from "pages/Electorate";
import { Header } from "components/Header";
import {
	fetchLikes,
	fetchRetweets,
	fetchSentiment,
	fetchCount,
} from "state/twitterData";
import { fetchCandidates, fetchNames } from "state/candidates";
import { GeneralComparisonPage } from "pages/GeneralComparisons";
import { CorrelationPage } from "pages/Correlation";
import {
	fetchLeaderData,
	fetchTweetsData,
	fetchVulgarityData,
} from "state/generalComparisons";

const useFetching = (): void => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCount());
		dispatch(fetchLikes());
		dispatch(fetchRetweets());
		dispatch(fetchSentiment());

		dispatch(fetchNames());
		dispatch(fetchCandidates());

		dispatch(fetchLeaderData());
		dispatch(fetchVulgarityData());
		dispatch(fetchTweetsData());
	}, [dispatch]);
};

export const App = (): JSX.Element => {
	useFetching();

	return (
		<Router>
			<Header />

			<Switch>
				<Route exact path="/">
					<ElectoratePage />
				</Route>
				<Route exact path="/electorates">
					<ElectoratePage />
				</Route>
				<Route exact path="/correlations">
					<CorrelationPage />
				</Route>
				<Route exact path="/general">
					<GeneralComparisonPage />
				</Route>
			</Switch>
		</Router>
	);
};
