import { Bar } from "recharts";
import { BarChartWrapper } from "components/BarChartWrapper";
import { useSelector } from "react-redux";
import { generalComparisonsSelector } from "state/generalComparisonsSelectors";
import styles from "./GeneralComparisons.module.css";

export const GeneralComparisonPage = (): JSX.Element => {
	const sentiment = useSelector(
		generalComparisonsSelector(
			"sentiment",
			new Set(["nonPolitical", "otherLeaderNonPoliticalContent"]),
		),
	);

	const likes = useSelector(
		generalComparisonsSelector(
			"likes",
			new Set(["nonPolitical", "otherLeaderNonPoliticalContent"]),
		),
	);

	const retweets = useSelector(
		generalComparisonsSelector(
			"retweets",
			new Set(["nonPolitical", "otherLeaderNonPoliticalContent"]),
		),
	);

	return (
		<div className={styles.wrapper}>
			<BarChartWrapper name="Leaders Sentiment (by Party)" data={sentiment}>
				<Bar dataKey="value" name="Sentiment" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper name="Leaders Likes (by Party)" data={likes}>
				<Bar dataKey="value" name="Likes" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper name="Leaders Retweets (by Party)" data={retweets}>
				<Bar dataKey="value" name="Retweets" fill="#8884d8" />
			</BarChartWrapper>
		</div>
	);
};
