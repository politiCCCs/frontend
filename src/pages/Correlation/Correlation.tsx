import { useSelector } from "react-redux";

import { ScatterPlot } from "components/ScatterPlot/ScatterPlot";
import { createPoliticianSelector } from "state/politicianSelectors";
import styles from "./Correlation.module.css";

export const CorrelationPage = (): JSX.Element => {
	const sentimentVsVotes = useSelector(createPoliticianSelector("sentiment"));
	const tweetsVsVotes = useSelector(createPoliticianSelector("count"));
	const retweetsVsVotes = useSelector(createPoliticianSelector("retweets"));
	const likesVsVotes = useSelector(createPoliticianSelector("likes"));

	return (
		<div className={styles.correlation}>
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
