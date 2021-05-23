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
			<BarChartWrapper name="Sentiment (by tweet group)" data={sentiment}>
				<Bar dataKey="value" name="Sentiment" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper
				name="Sentiment - Mean (by tweet group)"
				data={sentimentMean}
			>
				<Bar dataKey="value" name="Sentiment - Mean (by tweet group)" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper name="Likes (by tweet group)" data={likes}>
				<Bar dataKey="value" name="Likes" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper name="Likes - Mean (by tweet group)" data={likesMean}>
				<Bar dataKey="value" name="Likes (Mean)" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper name="Retweets (by tweet group)" data={retweets}>
				<Bar dataKey="value" name="Retweets" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper
				name="Retweets - Mean (by tweet group)"
				data={retweetsMean}
			>
				<Bar dataKey="value" name="Retweets (Mean)" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper name="Vulgarity (by tweet group)" data={vulgarity}>
				<Bar dataKey="value" name="Vulgarity" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper
				name="Vulgarity - Mean (by tweet group)"
				data={vulgarityMean}
			>
				<Bar dataKey="value" name="Vulgarity (Mean)" fill="#8884d8" />
			</BarChartWrapper>
		</div>
	);
};
