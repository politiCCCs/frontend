import { ScatterPlot } from "components/ScatterPlot/ScatterPlot";
import { useSelector } from "react-redux";
import { createSelector } from "../../state/selectors";

export const CorrelationPage = (): JSX.Element => {
	const sentimentVsVotes = useSelector(createSelector("sentiment"));
	const tweetsVsVotes = useSelector(createSelector("count"));
	const retweetsVsVotes = useSelector(createSelector("retweets"));
	const likesVsVotes = useSelector(createSelector("likes"));

	return (
		<div>
			<ScatterPlot
				name="Sentiment"
				xAxisTitle="Sentiment"
				yAxisTitle="Votes"
				points={sentimentVsVotes}
			/>
			<ScatterPlot
				name="Tweets"
				xAxisTitle="Tweets"
				yAxisTitle="Votes"
				points={tweetsVsVotes}
			/>
			<ScatterPlot
				name="Retweets"
				xAxisTitle="Retweets"
				yAxisTitle="Votes"
				points={retweetsVsVotes}
			/>
			<ScatterPlot
				name="Likes"
				xAxisTitle="Likes"
				yAxisTitle="Votes"
				points={likesVsVotes}
			/>
		</div>
	);
};
