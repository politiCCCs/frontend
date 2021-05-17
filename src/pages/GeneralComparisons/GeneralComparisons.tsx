import { Bar } from "recharts";
import { BarChartWrapper } from "components/BarChartWrapper";
import { useSelector } from "react-redux";
import {
	generalComparisonsCountSelector,
	generalComparisonsSelector,
} from "state/generalComparisonsSelectors";
import styles from "./GeneralComparisons.module.css";

export const GeneralComparisonPage = (): JSX.Element => {
	const sentiment = useSelector(generalComparisonsCountSelector("sentiment"));
	const sentimentMean = useSelector(
		generalComparisonsCountSelector("sentiment", true),
	);

	const likes = useSelector(generalComparisonsCountSelector("likes"));
	const likesMean = useSelector(generalComparisonsCountSelector("likes", true));

	const retweets = useSelector(generalComparisonsCountSelector("retweets"));
	const retweetsMean = useSelector(
		generalComparisonsCountSelector("retweets", true),
	);

	const vulgarity = useSelector(generalComparisonsSelector("vulgarity"));
	const vulgarityMean = useSelector(
		generalComparisonsSelector("vulgarity", true),
	);

	return (
		<div className={styles.wrapper}>
			<BarChartWrapper name="Leaders Sentiment (by Party)" data={sentiment}>
				<Bar dataKey="value" name="Sentiment" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper
				name="Leaders Sentiment - Mean (by Party)"
				data={sentimentMean}
			>
				<Bar dataKey="value" name="Sentiment - Mean (by Part)" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper name="Leaders Likes (by Party)" data={likes}>
				<Bar dataKey="value" name="Likes" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper name="Leaders Likes - Mean (by Party)" data={likesMean}>
				<Bar dataKey="value" name="Likes (Mean)" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper name="Leaders Retweets (by Party)" data={retweets}>
				<Bar dataKey="value" name="Retweets" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper
				name="Leaders Retweets - Mean (by Party)"
				data={retweetsMean}
			>
				<Bar dataKey="value" name="Retweets (Mean)" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper name="Leaders Vulgarity (by Party)" data={vulgarity}>
				<Bar dataKey="value" name="Vulgarity" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper
				name="Leaders Vulgarity - Mean (by Party)"
				data={vulgarityMean}
			>
				<Bar dataKey="value" name="Vulgarity (Mean)" fill="#8884d8" />
			</BarChartWrapper>
		</div>
	);
};
